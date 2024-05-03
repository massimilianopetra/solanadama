import * as sweb3 from '@solana/web3.js';
import * as anchor from "@project-serum/anchor";
import * as splToken from '@solana/spl-token'


export const RENT_PER_TOKEN_ACCOUNT_IN_SOL = 0.00203928;
export const COSTS_IN_SOL = 0.0002;
export const MAX_CLOSE_INSTRUCTIONS = 15;

const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  );

export interface EmptyAccount {
    publicKey: sweb3.PublicKey;
    lamports: number;
    mint: sweb3.PublicKey;
}

export interface EmptyAccountInfo {
    id: number,
    account: EmptyAccount,
    lamports: number,
    metadata?: sweb3.PublicKey,
    image?: string,
    name?: string
}


export interface TotalRedemptions {
    totalCloses: number;
    totalSolRedeemed: number;
}

export function solForEmptyAccounts(emptyAccounts: EmptyAccount[]) : number {
    return emptyAccounts.map(eA => eA.lamports)
        .reduce((prev, curr)=> {return prev + curr;}, 0) / sweb3.LAMPORTS_PER_SOL;
}

export function getPKsToClose(emptyAccounts: EmptyAccount[]): sweb3.PublicKey[] {
    return emptyAccounts.map(eA => eA.publicKey);
}


export async function getTotalRedemptions(connection: sweb3.Connection, account: sweb3.PublicKey) : Promise<TotalRedemptions|null> {
    const buffer = await connection.getAccountInfo(account);
    if(!buffer || !buffer.data){
        console.log("Could not get account info for "+account.toBase58());
        return null;
    }
    const closedAccounts = buffer.data.readInt32LE(8)
    return {
        totalCloses: closedAccounts,
        totalSolRedeemed: RENT_PER_TOKEN_ACCOUNT_IN_SOL * closedAccounts
    }
}


export async function findEmptyTokenAccounts(connection: sweb3.Connection, owner: sweb3.PublicKey) : Promise<EmptyAccount[]> {
    const response = await connection.getTokenAccountsByOwner(owner,{programId: splToken.TOKEN_PROGRAM_ID});
    //console.log(response);
    const emptyAccounts: EmptyAccount[] = [];
    for (let account of response.value){
        //console.log(account.pubkey.toBase58());
        let isEmpty = false;
        const offsetInBytes = 8*8;
        if(account.account.data.readBigUInt64LE){
            const amount = account.account.data.readBigUInt64LE(offsetInBytes);
            //console.log("amount: "+amount);
            isEmpty = amount === BigInt('0');
        } else {
            // readBigUInt64LE not available in older versions
            isEmpty = true;
            for (let i = 0; i<8; i++){
                if(account.account.data[offsetInBytes+i]!==0){
                    isEmpty = false;
                    break;
                }
            }
        }
        if(isEmpty){
            //console.log("found empty account: "+account.pubkey.toBase58());
            const mint = new sweb3.PublicKey(account.account.data.slice(0, 32));
            const eA : EmptyAccount = {
                publicKey: account.pubkey,
                lamports: account.account.lamports,
                mint: mint
            };
            emptyAccounts.push(eA);
        }
    }
    return emptyAccounts;

}

export async function createCloseEmptyAccountsTransactions(owner: sweb3.PublicKey, 
    accountPKs: sweb3.PublicKey[], cntAccount?: sweb3.PublicKey, program?: anchor.Program, 
    donationPercentage?: number, donationAddress?: sweb3.PublicKey): Promise<sweb3.Transaction[]> {

    const closeInstructions = accountPKs.map(accPK => splToken.createCloseAccountInstruction(
        splToken.TOKEN_PROGRAM_ID,
        accPK,
        owner,
        []
    ));

    let transactions: sweb3.Transaction[] = [];
    
    while(closeInstructions.length>0){
        const transaction = new sweb3.Transaction();

        // add close instructions
        for (let i = 0; i < MAX_CLOSE_INSTRUCTIONS; i++) {
            const nextInstr = closeInstructions.pop();
            if(nextInstr){
                transaction.add(nextInstr);
            } else {
                break;
            }
        }

        // add donation instruction
        if(donationPercentage && donationAddress){
            const closeInstrCnt = transaction.instructions.length;
            const donationAmount = RENT_PER_TOKEN_ACCOUNT_IN_SOL * closeInstrCnt * donationPercentage/100;
            const donationInstruction = sweb3.SystemProgram.transfer({
                fromPubkey: owner,
                toPubkey: donationAddress,
                lamports: sweb3.LAMPORTS_PER_SOL * donationAmount,
            });
            transaction.add(donationInstruction);
        }

        // add counter program instruction
        if(cntAccount && program){
            //console.log("Program is here! "+program);
            const cntInstruction = program.instruction.count(
                {
                accounts:
                {
                  feecntrAccount: cntAccount,
                  instructionSysvarAccount: anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY,
        
                }
              });
              //console.log("instruction created! ");
            transaction.add(cntInstruction);
        }

        transactions.push(transaction);
    }
    return transactions;
}

export async function getEmptyAccountInfos(connection: sweb3.Connection, accounts: EmptyAccount[], callback?: any) : Promise<EmptyAccountInfo[]> {
    const accList = accounts.map((acc , i) => {
        const adr =acc.publicKey.toBase58();
         return {account: acc, 
            id: i, 
            link:getSolscanLink(adr),
            lamports: acc.lamports
    }});

    //accList.forEach(element => populateMetadataInfo(connection, element));
    populateAll(connection, accList, callback);

    return accList;
}

async function populateAll(connection: sweb3.Connection, accounts: EmptyAccountInfo[], callback?:any) {
    for(const acc of accounts){
        await populateMetadataInfo(connection, acc);
    }
    callback(accounts);
}

export function getSolscanLink(address: string) : string {
    return "https://solscan.io/address/"+address;
}

async function populateMetadataInfo(connection: sweb3.Connection, accountInfo: EmptyAccountInfo) {
    const metadataAccount = await getMetadataAccount(accountInfo.account.mint);
    accountInfo.metadata = metadataAccount;
    accountInfo.name = await getNFTName(connection, metadataAccount);
    console.log(metadataAccount.toBase58()+ " "+ accountInfo.name);
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

async function getNFTName(connection: sweb3.Connection, metadataAccount: sweb3.PublicKey) : Promise<string | undefined>{
    const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

    if(metadataAccountInfo){
        const nameBuffer = metadataAccountInfo.data.slice(1+32+32+4, 1+32+32+4+32);
        
        const nameLenght = metadataAccountInfo.data.readUInt32LE(1+32+32);
        let name = "";
        for (let j = 0; j< nameLenght; j++){
            if (nameBuffer.readUInt8(j)===0) break;
            name += String.fromCharCode(nameBuffer.readUInt8(j));
        }
        return name;
    }
    return undefined;
}