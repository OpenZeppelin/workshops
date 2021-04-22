// scripts/propose-upgrade.js
const { defender } = require("hardhat");

async function main() {
  const proxyAddress = 'replace with your proxy address';

  const BoxV2 = await ethers.getContractFactory("BoxV2");
  console.log("Preparing proposal...");
  const proposal = await defender.proposeUpgrade(proxyAddress, BoxV2, { title: 'Rollback to V2' });
  console.log("Upgrade proposal created at:", proposal.url);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  })

