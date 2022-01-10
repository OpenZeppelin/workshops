const { ethers } = require('hardhat');
const { readFileSync } = require('fs');

function getInstance(name) {
  const address = JSON.parse(readFileSync('deploy.json'))[name];
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`);
  return ethers.getContractFactory(name).then(f => f.attach(address));
}

async function main() {
  const forwarder = await getInstance('MinimalForwarder');
  console.log(`Testing request tmp/request.json on forwarder at ${forwarder.address}...`);
  const { request, signature } = JSON.parse(readFileSync('tmp/request.json'));

  try {
    const valid = await forwarder.verify(request, signature);
    console.log(`Signature ${signature} for request is${!valid ? ' not ' : ' '}valid`);
  } catch (err) {
    console.log(`Could not validate signature for request: ${err.message}`);
  }
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}