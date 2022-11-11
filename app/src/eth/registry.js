import { ethers } from 'ethers';
import { Registry as address } from '../deploy.json';

const abi = [{"inputs":[{"internalType":"contract MinimalForwarder","name":"forwarder","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"who","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"Registered","type":"event"},{"inputs":[{"internalType":"address","name":"forwarder","type":"address"}],"name":"isTrustedForwarder","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"names","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"owners","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export function createInstance(provider) {
  return new ethers.Contract(address, abi, provider);
}
