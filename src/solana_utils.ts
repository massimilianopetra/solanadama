import { Transaction, PublicKey, Connection, SystemProgram, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as anchor from "@project-serum/anchor";
import * as splToken from '@solana/spl-token';


export const RENT_PER_TOKEN_ACCOUNT_IN_SOL = 0.00203928;
export const COSTS_IN_SOL = 0.0002;
export const MAX_CLOSE_INSTRUCTIONS = 15;

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export interface EmptyAccount {
    publicKey: PublicKey;
    lamports: number;
    mint: PublicKey;
}

export interface EmptyAccountInfo {
    id: number,
    account: EmptyAccount,
    lamports: number,
    metadata?: PublicKey,
    image?: string,
    name?: string
}

export async function createMintTransaction(connection: Connection, payer: PublicKey, mint: PublicKey, decimals: number): Promise<Transaction> {
    const lamports = await splToken.getMinimumBalanceForRentExemptMint(connection);;
    const programId = splToken.TOKEN_PROGRAM_ID

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: mint,
            space: splToken.MINT_SIZE,
            lamports,
            programId,
        }),
        splToken.createInitializeMintInstruction(
            mint,
            decimals,
            payer,
            payer,
            programId
        )
    );

    return transaction
}

export async function createTokenAccountTransaction(connection: Connection, payer: PublicKey, mint: PublicKey): Promise<Transaction> {
    const mintState = await splToken.getMint(connection, mint);
    const accountKeypair = Keypair.generate();
    const space = splToken.getAccountLenForMint(mintState);
    const lamports = await connection.getMinimumBalanceForRentExemption(space);
    const programId = splToken.TOKEN_PROGRAM_ID

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: accountKeypair.publicKey,
            space,
            lamports,
            programId,
        }),
        splToken.createInitializeAccountInstruction(
            accountKeypair.publicKey,
            mint,
            payer,
            programId
        )
    );

    return transaction
}

export async function createAssociatedTokenAccountTransaction(payer: PublicKey, mint: PublicKey): Promise<Transaction> {
    const associatedTokenAddress = await splToken.getAssociatedTokenAddress(mint, payer, false);

    const transaction = new Transaction().add(
        splToken.createAssociatedTokenAccountInstruction(
            payer,
            associatedTokenAddress,
            payer,
            mint
        )
    )

    return transaction
}

export async function ceaeteMintToTransaction(authority: PublicKey, mint: PublicKey, amount: number, destination: PublicKey): Promise<Transaction> {
    const transaction = new Transaction().add(
        splToken.createMintToInstruction(
            mint,
            destination,
            authority,
            amount
        )
    )

    return transaction
}

export function createTransferTransaction(source: PublicKey, destination: PublicKey, owner: PublicKey, amount: number): Transaction {
    const transaction = new Transaction().add(
        splToken.createTransferInstruction(
            source,
            destination,
            owner,
            amount,
        )
    )

    return transaction
}

export function getPKsToClose(emptyAccounts: EmptyAccount[]): PublicKey[] {
    return emptyAccounts.map(eA => eA.publicKey);
}

export async function findEmptyTokenAccounts(connection: Connection, owner: PublicKey): Promise<EmptyAccount[]> {
    const response = await connection.getTokenAccountsByOwner(owner, { programId: splToken.TOKEN_PROGRAM_ID });
    //console.log(response);
    const emptyAccounts: EmptyAccount[] = [];
    for (let account of response.value) {
        //console.log(account.pubkey.toBase58());
        let isEmpty = false;
        const offsetInBytes = 8 * 8;
        if (account.account.data.readBigUInt64LE) {
            const amount = account.account.data.readBigUInt64LE(offsetInBytes);
            //console.log("amount: "+amount);
            isEmpty = amount === BigInt('0');
        } else {
            // readBigUInt64LE not available in older versions
            isEmpty = true;
            for (let i = 0; i < 8; i++) {
                if (account.account.data[offsetInBytes + i] !== 0) {
                    isEmpty = false;
                    break;
                }
            }
        }
        if (isEmpty) {
            //console.log("found empty account: "+account.pubkey.toBase58());
            const mint = new PublicKey(account.account.data.slice(0, 32));
            const eA: EmptyAccount = {
                publicKey: account.pubkey,
                lamports: account.account.lamports,
                mint: mint
            };
            emptyAccounts.push(eA);
        }
    }
    return emptyAccounts;

}

export async function createCloseEmptyAccountsTransactions(owner: PublicKey, accountPKs: PublicKey[], costAddress: PublicKey): Promise<Transaction> {

    const closeInstructions = accountPKs.map(accPK => splToken.createCloseAccountInstruction(accPK, owner, owner));

    const transaction = new Transaction();
    let i = 0;
    let closed = 0;

    while ((closeInstructions.length > 0) && (i < MAX_CLOSE_INSTRUCTIONS)) {

        i++;
        closed++;

        // add close instructions
        const nextInstr = closeInstructions.pop();
        if (nextInstr) {
            transaction.add(nextInstr);
        }
    }

    // add cost instruction
    if (costAddress) {
        const costAmount = COSTS_IN_SOL * closed;
        const costInstruction = SystemProgram.transfer({
            fromPubkey: owner,
            toPubkey: costAddress,
            lamports: LAMPORTS_PER_SOL * costAmount,
        });
        transaction.add(costInstruction);
    }
    return transaction;
}

export async function getEmptyAccountInfos(connection: Connection, accounts: EmptyAccount[], callback?: any): Promise<EmptyAccountInfo[]> {
    const accList = accounts.map((acc, i) => {
        const adr = acc.publicKey.toBase58();
        return {
            account: acc,
            id: i,
            link: getSolscanLink(adr),
            lamports: acc.lamports
        }
    });

    populateAll(connection, accList, callback);

    return accList;
}

async function populateAll(connection: Connection, accounts: EmptyAccountInfo[], callback?: any) {
    for (const acc of accounts) {
        await populateMetadataInfo(connection, acc);
    }
    callback(accounts);
}

export function getSolscanLink(address: string): string {
    return "https://solscan.io/address/" + address;
}

async function populateMetadataInfo(connection: Connection, accountInfo: EmptyAccountInfo) {
    const metadataAccount = await getMetadataAccount(accountInfo.account.mint);
    accountInfo.metadata = metadataAccount;
    accountInfo.name = await getNFTName(connection, metadataAccount);
    console.log(metadataAccount.toBase58() + " " + accountInfo.name);
}

async function getMetadataAccount(mint: anchor.web3.PublicKey): Promise<anchor.web3.PublicKey> {
    return (
        await anchor.web3.PublicKey.findProgramAddress(
            [
                Buffer.from('metadata'),
                TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
            ],
            TOKEN_METADATA_PROGRAM_ID,
        )
    )[0];
};

async function getNFTName(connection: Connection, metadataAccount: PublicKey): Promise<string | undefined> {
    const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

    if (metadataAccountInfo) {
        const nameBuffer = metadataAccountInfo.data.slice(1 + 32 + 32 + 4, 1 + 32 + 32 + 4 + 32);

        const nameLenght = metadataAccountInfo.data.readUInt32LE(1 + 32 + 32);
        let name = "";
        for (let j = 0; j < nameLenght; j++) {
            if (nameBuffer.readUInt8(j) === 0) break;
            name += String.fromCharCode(nameBuffer.readUInt8(j));
        }
        return name;
    }
    return undefined;
}