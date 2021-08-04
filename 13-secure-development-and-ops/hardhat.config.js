require('dotenv').config();

require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');

const { PRIVATE_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'moonbeam',
  networks: {
    moonbeam: {
      url: "https://rpc.testnet.moonbeam.network/",
      accounts: [PRIVATE_KEY]
    },
  }
};
