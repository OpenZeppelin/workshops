const { AutotaskClient } = require('defender-autotask-client');

async function uploadCode(autotaskId, apiKey, apiSecret) {
  const client = new AutotaskClient({ apiKey, apiSecret });
  await client.updateCodeFromFolder(autotaskId, './build/relay');
}

async function main() {
  require('dotenv').config();
  const { TEAM_API_KEY: apiKey, TEAM_API_SECRET: apiSecret, AUTOTASK_ID: autotaskId } = process.env;
  if (!autotaskId) throw new Error(`Missing autotask id`);
  await uploadCode(autotaskId, apiKey, apiSecret);
  console.log(`Code updated`);
}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}