const { ethers } = require('hardhat');
const { readFileSync } = require('fs');

function getInstance(name) {
  const address = JSON.parse(readFileSync('deploy.json'))[name];
  if (!address) throw new Error(`Contract ${name} not found in deploy.json`);
  return ethers.getContractFactory(name).then(f => f.attach(address));
}

async function main() {
  const registry = await getInstance("Registry");
  const events = await registry.queryFilter(registry.filters.Registered());
  console.log('Registrations')
  console.log('=============')
  console.log(events.map(e => `[${e.blockNumber}] ${e.args.who} => ${e.args.name}`).join('\n'));
  console.log();
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}