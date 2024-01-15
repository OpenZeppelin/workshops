require('dotenv').config();

const { Defender } = require('@openzeppelin/defender-sdk');

async function uploadCode(actionId, apiKey, apiSecret) {
  const client = new Defender({ apiKey, apiSecret });
  await client.action.updateCodeFromFolder(actionId, './build/action');
}

async function main() {
  const { API_KEY: apiKey, API_SECRET: apiSecret, ACTION_ID: actionId } = process.env;

  if (!actionId) throw new Error(`Missing Action ID`);

  await uploadCode(actionId, apiKey, apiSecret);
  console.log(`Code updated!`);
}

if (require.main === module) {
  main().catch(console.error);
}