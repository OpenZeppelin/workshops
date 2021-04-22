require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require('@openzeppelin/hardhat-defender');

const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_API_KEY;

module.exports = {
  defender: {
    apiKey: process.env.DEFENDER_TEAM_API_KEY,
    apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraKey}`,
      accounts: { mnemonic }
    }
  },
  solidity: '0.8.0'
};
