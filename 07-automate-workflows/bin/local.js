#! /usr/bin/node
const TEST_RECIPIENT = '0x54060A72EeF20946a9c736CEAeca5A081F622200';

const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');
const { main } = require('../src');

// Load credentials from .env file
require('dotenv').config();

// Create signer object connected to our Defender Relayer
const { RELAYER_API_KEY: apiKey, RELAYER_API_SECRET: apiSecret } = process.env;
const creds = { apiKey, apiSecret };
const provider = new DefenderRelayProvider(creds);
const signer = new DefenderRelaySigner(creds, provider, { speed: 'fast' });

// Set up mock storage and test recipient address
const fakeStorage = { get: () => false, put: () => {} };
const recipient = TEST_RECIPIENT;

// Run!
main(recipient, signer, fakeStorage)
  .then(() => process.exit(0))
  .catch(error => { console.error(error); process.exit(1); });
