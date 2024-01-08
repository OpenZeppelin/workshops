require('dotenv').config();

const { Defender } = require('@openzeppelin/defender-sdk');
const { appendFileSync, writeFileSync} = require('fs');

async function main() {
  const creds = { apiKey: process.env.API_KEY, apiSecret: process.env.API_SECRET };
  const client = new Defender(creds);

  // Create Relayer using Defender SDK client.
  const requestParams = {
    name: 'MetaTxRelayer',
    network: 'sepolia',
    minBalance: BigInt(1e17).toString(),
  };

  const relayer = await client.relay.create(requestParams);
  
  // Store Relayer info in file - ID is all you need if sending tx via Action.
  writeFileSync('relayer.json', JSON.stringify({
    relayer
  }, null, 2));
  console.log('Relayer ID: ', relayer.relayerId);

  // Create and save the Relayer API key to .env - needed for sending tx directly
  const {apiKey: relayerKey, secretKey: relayerSecret} = await client.relay.createKey(relayer.relayerId);
  appendFileSync('.env', `\nRELAYER_API_KEY=${relayerKey}\nRELAYER_API_SECRET=${relayerSecret}`);
}

if (require.main === module) {
  main().catch(console.error);
}