require('dotenv').config();

const { Defender } = require('@openzeppelin/defender-sdk');
const { ethers } = require('hardhat')
const { writeFileSync } = require('fs')

async function main() {
  const creds = {
    relayerApiKey: process.env.RELAYER_API_KEY,
    relayerApiSecret: process.env.RELAYER_API_SECRET,
  };
  const client = new Defender(creds);

  const provider = client.relaySigner.getProvider();
  const signer = client.relaySigner.getSigner(provider, { speed: 'fast' });

  const forwarderFactory = await ethers.getContractFactory('ERC2771Forwarder', signer)
  const forwarder = await forwarderFactory.deploy('ERC2771Forwarder')
    .then((f) => f.deployed())

  const registryFactory = await ethers.getContractFactory('Registry', signer)
  const registry = await registryFactory.deploy(forwarder.address)
    .then((f) => f.deployed())

  writeFileSync(
    'deploy.json',
    JSON.stringify(
      {
        ERC2771Forwarder: forwarder.address,
        Registry: registry.address,
      },
      null,
      2
    )
  )

  console.log(
    `ERC2771Forwarder: ${forwarder.address}\nRegistry: ${registry.address}`
  )
}

if (require.main === module) {
  main().catch(console.error);
}