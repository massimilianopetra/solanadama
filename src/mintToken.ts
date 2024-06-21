import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
import * as fs from 'fs';

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const KEYPAIR_PATH = ".config/solana/id.json"
  const kp = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(KEYPAIR_PATH, 'utf8'))));
  const mintAuthority = kp;
  const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

  const mint = await createMint(
    connection,
    kp,
    mintAuthority.publicKey,
    mintAuthority.publicKey,
    6 // We are using 9 to match the CLI decimal default exactly
  );

  console.log("Mint address: " + mint.toBase58());

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    kp,
    mint,
    kp.publicKey
  )

  console.log("Account address: " + tokenAccount.address.toBase58());

  await mintTo(
    connection,
    kp,
    mint,
    tokenAccount.address,
    mintAuthority,
    1000000000 * 1000000 // because decimals for the mint are set to 6 
  )

  console.log("Token minted");

  const metadataData = {
    name: "Solana Training Token",
    symbol: "TRAINING",
    uri: "https://bafkreihwqhounu3cdwgvk2gc2dqcinpntlccbo3xcy4xuerd24yndldl5q.ipfs.nftstorage.link",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  const metadataPDAAndBump = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  const metadataPDA = metadataPDAAndBump[0];

  const transaction = new Transaction();

  const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: mint,
      mintAuthority: kp.publicKey,
      payer: kp.publicKey,
      updateAuthority: kp.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    }
  );

  transaction.add(createMetadataAccountInstruction);

  const tx = await sendAndConfirmTransaction(connection, transaction, [kp]);

  console.log("Metadata TX "+tx);

}

main();