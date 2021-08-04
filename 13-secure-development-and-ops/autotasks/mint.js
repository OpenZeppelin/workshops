const ABI = [`function safeMint(address to) public`];

const ADDRESS = '0x36F7ec6153F460D0eAB6EEE995a29A522bf10Cb4';
const RECIPIENT = '0xf0A9eD2663311CE436347Bb6F240181FF103CA16';

const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');

/**
 * Mints an NFT for a recipient
 */
async function main(signer, recipient) {
  const nft = new ethers.Contract(ADDRESS, ABI, signer);
  const tx = await nft.safeMint(recipient);
  console.log(`Minted an NFT for ${recipient} in ${tx.hash}`);
}

// Entrypoint for the Autotask
exports.handler = async function(params) {
  const provider = new DefenderRelayProvider(params);
  const signer = new DefenderRelaySigner(params, provider, { speed: 'fast' });
  console.log(`Using relayer ${await signer.getAddress()}`);
  await main(signer, RECIPIENT);
}

// Exported for running locally
exports.main = main;