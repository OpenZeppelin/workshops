const { ethers, upgrades } = require("hardhat");

const name = 'MyToken';

async function main() {
  const factory = await ethers.getContractFactory(name);
  const contract = await upgrades.deployProxy(factory, { kind: 'uups' });
  console.log(`Deployed ${name} at ${contract.address}`);
}

main().catch(err => { console.error(err); process.exit(1); });