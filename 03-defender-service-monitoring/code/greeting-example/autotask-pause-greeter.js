const { Relayer } = require('defender-relay-client');
const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"text","type":"string"},{"indexed":false,"internalType":"address","name":"sender","type":"address"}],"name":"Greeting","type":"event"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"dropAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"text","type":"string"}],"name":"greet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}];

exports.handler = async function(request) {
  const greeterAddress = "0x42307F2201658D49801c37eb82F5Db0Cb0546D10";
  const client = new Relayer(request);
  const relayer = await client.getRelayer();
  const provider = new DefenderRelayProvider(request);
  const signer = new DefenderRelaySigner(request, provider, { 
        speed: 'fast', 
        from: relayer.address,
    });

  const greeter = new ethers.Contract(greeterAddress, abi, signer);
  await greeter.pause();
  
  return `paused ${greeter.address}`
}
