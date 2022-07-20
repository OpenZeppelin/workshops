const { handler } = require('../autotasks/relay/');

// Run autotask code locally using the Relayer API key and secret
if (require.main === module) {
  const { secretKey: { apiKey, secretKey} } = JSON.parse(require('fs').readFileSync('.env.relay'))
  const payload = require('fs').readFileSync('tmp/request.json');
  handler({ apiKey, apiSecret: secretKey, request: { body: JSON.parse(payload) } })
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}