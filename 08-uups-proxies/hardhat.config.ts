import type { HardhatUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-ethers';
import '@openzeppelin/hardhat-upgrades';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.2',
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
};

export default config;
