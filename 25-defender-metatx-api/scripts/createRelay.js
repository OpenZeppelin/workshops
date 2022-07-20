const { RelayClient } = require('defender-relay-client');
const { appendFile, readFileSync, writeFileSync} = require('fs');

async function run() {
  require('dotenv').config();
  const { TEAM_API_KEY: apiKey, TEAM_API_SECRET: apiSecret, AUTOTASK_ID: autotaskId } = process.env;
  const relayClient = new RelayClient({ apiKey, apiSecret });

  // create relay using defender client
  const requestParams = {
    name: 'MetaTxRelayer',
    network: 'goerli',
    minBalance: BigInt(1e17).toString(),
  };
  const relayer = await relayClient.create(requestParams);
  
  // store relayer info in file
  writeFileSync('relay.json', JSON.stringify({
    relayer
  }, null, 2));
  console.log('Relayer ID: ', relayer);

  // create and save the api key to .env - needed for sending tx
  const {relay} = JSON.parse(readFileSync('relay.json'))
  const secretKey = await relayClient.createKey(relayer.relayerId);
  writeFileSync('.env.relay', JSON.stringify({secretKey}, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
