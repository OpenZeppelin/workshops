const ABI = [`function safeMint(address to, uint256 tokenId) public`];
const NFT_ADDRESS = '0xD958a8588117BFBaDE0f23147cB25FFeaE8Ccf64';

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
  if (await storage.get(key)) {
    console.log(`Address ${recipient} already received an NFT`);
    return;
  }

  // Mint them an NFT
  const tokenId = recipient;
  const nft = new ethers.Contract(NFT_ADDRESS, ABI, signer);
  const tx = await nft.safeMint(recipient, tokenId);
  await storage.put(key, tokenId);
  console.log(`Minted an NFT for ${recipient} in ${tx.hash}`);
}

// Entrypoint for the Autotask
exports.handler = async function(params) {
  const provider = new DefenderRelayProvider(params);
  const signer = new DefenderRelaySigner(params, provider, { speed: 'fast' });
  const { KeyValueStoreClient } = require('defender-kvstore-client');
  const storage = new KeyValueStoreClient(params);

  const [event] = params.request.body.matchReasons;
  console.log('Received match', JSON.stringify(event));
  const recipient = event.params.to;

  console.log(`Processing trade for ${recipient}`);
  await main(recipient, signer, storage);
}

// Exported for running locally
exports.main = main;