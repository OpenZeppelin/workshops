/* eslint-disable no-unused-vars */
import { ethers } from 'ethers';

const CLOUDFLARE_ENDPOINT = 'https://dai.poa.network';
const MAIN_ENDPOINT = 'https://rpc.xdaichain.com/';
const ALTERNATE_ENDPOINT = 'https://xdai.poanetwork.dev';
const UNSECURE_ENDPOINT = 'http://xdai.poanetwork.dev';
const QUICKNODE_ENDPOINT = process.env.REACT_APP_QUICKNODE_URL;

export function createProvider() {  
  return new ethers.providers.JsonRpcProvider(QUICKNODE_ENDPOINT || MAIN_ENDPOINT, 100);
}