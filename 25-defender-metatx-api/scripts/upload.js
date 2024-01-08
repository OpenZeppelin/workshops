const { AutotaskClient } = require('defender-autotask-client');

async function uploadCode(actionId, apiKey, apiSecret) {
  const client = new AutotaskClient({ apiKey, apiSecret });
  await client.updateCodeFromFolder(actionId, './build/relay');
}

async function main() {
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret, ACTION_ID: actionId } = process.env;
  if (!actionId) throw new Error(`Missing Action ID`);
  await uploadCode(actionId, apiKey, apiSecret);
  console.log(`Code updated`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}