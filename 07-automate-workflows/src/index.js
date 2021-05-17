const ABI = [`function safeMint(address to, uint256 tokenId) public`];
const NFT_ADDRESS = process.env.NFT_ADDRESS || '0x5ada09178E90b817048e5ECC64314815e8e13Be2';
const TEST_RECIPIENT = '0x54060A72EeF20946a9c736CEAeca5A081F622200';

const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');

/**
 * Mints an NFT for the recipient if it hasn't received one yet
 * @param {string} recipient the recipient's address
 * @param {ethers.Signer} signer ethers signer for sending the tx
 * @param {KeyValueStoreClient} storage optional key-value store for tracking the token
 */
async function main(recipient, signer, storage) {
  console.log(`Using relayer ${await signer.getAddress()}`);

  // Check if recipient was already awarded an nft
  const key = `nft-recipients/${NFT_ADDRESS}/${recipient}`;
  if (storage && await storage.get(key)) {
    console.log(`Address ${recipient} already received an NFT`);
    return;
  }

  // Mint them an NFT and track it
  const tokenId = recipient;
  const nft = new ethers.Contract(NFT_ADDRESS, ABI, signer);
  const tx = await nft.safeMint(recipient, tokenId);
  if (storage) await storage.put(key, tokenId);

  console.log(`Minted an NFT for ${recipient} in ${tx.hash}`);
}

// Entrypoint for the Autotask
exports.handler = async function(params) {
  const provider = new DefenderRelayProvider(params);
  const signer = new DefenderRelaySigner(params, provider, { speed: 'fast' });
  // const { KeyValueStoreClient } = require('defender-kvstore-client');
  // const storage = new KeyValueStoreClient(params);

  let recipient = TEST_RECIPIENT;
  if (params.request) {
    const [event] = params.request.body.matchReasons;
    console.log('Received match: ', JSON.stringify(event, null, 2));
    recipient = event.params.to;
  }

  console.log(`Processing ${recipient}`);
  await main(recipient, signer);
}

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  require('dotenv').config();
  const { RELAYER_API_KEY: apiKey, RELAYER_API_SECRET: apiSecret } = process.env;
  const creds = { apiKey, apiSecret };
  const provider = new DefenderRelayProvider(creds);
  const signer = new DefenderRelaySigner(creds, provider, { speed: 'fast' });
  const recipient = TEST_RECIPIENT;

  main(recipient, signer)
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}