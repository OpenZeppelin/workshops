const ethers = require('ethers')
const { DefenderRelaySigner, DefenderRelayProvider, } = require('defender-relay-client/lib/ethers')

async function handler(event) {
  const payload = event.request.body;
  const ABI = payload.sentinel.abi;
  const ADDRESS = payload.transaction.to;

  const provider = new DefenderRelayProvider(event)
  const signer = new DefenderRelaySigner(event, provider, { speed: 'fast' })

  const erc721 = new ethers.Contract(ADDRESS, ABI, signer)

  const isPaused = await erc721.paused()
  if (!isPaused) {
    const tx = await erc721.pause()
    console.log("TX:")
    console.log(tx)
  } else if (isPaused) {
    console.log('Contract is paused; doing nothing')
  } 
}

module.exports={
  handler
}