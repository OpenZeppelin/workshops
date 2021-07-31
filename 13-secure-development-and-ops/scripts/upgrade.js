const { ethers, upgrades } = require("hardhat");

const name = 'MyToken';
const address = process.env.ADDRESS;

async function main() {  
  const factory = await ethers.getContractFactory(name);
  const contract = await upgrades.upgradeProxy(address, factory);
  console.log(`Upgraded ${name} at ${contract.address}`);
}

main().catch(err => { console.error(err); process.exit(1); });