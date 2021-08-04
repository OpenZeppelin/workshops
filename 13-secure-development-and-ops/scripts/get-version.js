const { ethers } = require("hardhat");

const name = 'MyToken';
const address = process.env.ADDRESS;

async function main() {  
  const contract = await ethers.getContractFactory(name).then(f => f.attach(address));
  const version = await contract.version();
  console.log(`Version of ${name} at ${contract.address} is ${version}`);
}

main().catch(err => { console.error(err); process.exit(1); });