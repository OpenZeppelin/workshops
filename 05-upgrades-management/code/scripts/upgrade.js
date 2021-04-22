// scripts/upgrade.js
const { ethers } = require("hardhat");

async function main () {
  const newImplName = 'BoxV2';
  const NewImpl = await ethers.getContractFactory(newImplName);
  console.log(`Upgrading to ${newImplName}...`);
  await upgrades.upgradeProxy('replace with your proxy address', NewImpl);
  console.log(`Box upgraded to:`, newImplName);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
