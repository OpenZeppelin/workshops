import { ethers } from "hardhat";
import "dotenv/config";
import * as NFTJSON from "./../artifacts/contracts/NFT.sol/ChinchillaToken.json";

// TODO: Change the below type name to your contract name:
import { ChinchillaToken } from "../typechain-types";
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("goerli");
  const signer = wallet.connect(provider); // This is your wallet

  // Now deploy NFT Marketplace
  console.log("Deploying NFT Marketplace contract");
  const NFTFactory = new ethers.ContractFactory(
    NFTJSON.abi,
    NFTJSON.bytecode,
    signer
  );
  // TODO: Change object type below from 'ChinchillaToken' to your contract name
  const NFTMarketContract = (await NFTFactory.deploy()) as ChinchillaToken;
  await NFTMarketContract.deployed();

  console.log(
    "Completed NFT Marketplace deployment at %s",
    NFTMarketContract.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
