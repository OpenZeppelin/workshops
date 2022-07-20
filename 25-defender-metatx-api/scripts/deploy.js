require('dotenv').config();
const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');
const { ethers } = require('hardhat');
const fs = require('fs');


async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.connect(relaySigner).deploy(...params).then(f => f.deployed());
}
async function main() {
  const { secretKey } = JSON.parse(fs.readFileSync('.env.relay'))
  const credentials = { apiKey: secretKey.apiKey, apiSecret: secretKey.secretKey };
  const provider = new DefenderRelayProvider(credentials);
  const relaySigner = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
 
  const Forwarder = await ethers.getContractFactory('MinimalForwarder');
  const forwarder = await Forwarder.connect(relaySigner).deploy().then(f => f.deployed());

  const Registry = await ethers.getContractFactory("Registry");
  const registry = await Registry.connect(relaySigner).deploy(forwarder.address).then(f => f.deployed());

  fs.writeFileSync('deploy.json', JSON.stringify({
    MinimalForwarder: forwarder.address,
    Registry: registry.address,
  }, null, 2));

  console.log(`MinimalForwarder: ${forwarder.address}\nRegistry: ${registry.address}`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
