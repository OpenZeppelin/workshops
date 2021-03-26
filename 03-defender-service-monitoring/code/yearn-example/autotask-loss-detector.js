const {
	Relayer
} = require('defender-relay-client');
const {
	ethers
} = require("ethers");
const axios = require('axios');
const {
	DefenderRelaySigner,
	DefenderRelayProvider
} = require('defender-relay-client/lib/ethers');
const divider = {
	type: 'divider'
};

function markdown(msg) {
	return {
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: msg,
		},
	}
}

function txLink(hash) {
	return `https://etherscan.io/tx/${hash}`
}
async function sendLossAlert(payload, sentinelEvent, loss) {
	const notification = {
		blocks: [divider, markdown('❗*VAULT LOSS DETECTED*❗'), divider, markdown(`Address: ${sentinelEvent.sentinel.address}`), markdown(`Amount: ${loss}`), markdown(`Risky Transaction: ${txLink(sentinelEvent.transaction.transactionHash)}`)],
	};
	const url = payload.secrets.slackWebhookUrl;
	await axios.post(url, notification, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// 1 Million DAI
const threshold = ethers.BigNumber.from("-1000000000000000000000000")

// receives event from sentinel
exports.handler = async function (payload) {
	// init
	const provider = new DefenderRelayProvider(payload);
	const evt = payload.request.body;

	// init vault contract
	const abi = evt.sentinel.abi;
	const address = evt.sentinel.address;
	const yVault = new ethers.Contract(address, abi, provider);

	// get balance for this block and previous block
	const block = await provider.getBlock(evt.blockHash)
	const currentBlockBalance = await yVault.balance({
		blockTag: block.number
	});
	const prevBlockBalance = await yVault.balance({
		blockTag: block.number - 1
	})

	// send alert if loss exceeds threshold
	const delta = currentBlockBalance.sub(prevBlockBalance);
	const exceedsThreshold = delta.lte(threshold);
	if (exceedsThreshold) {
		await sendLossAlert(payload, evt, delta);
	}

	// for logging
	return {
		currentBlockBalance,
		prevBlockBalance,
		delta,
		exceedsThreshold
	}
}
