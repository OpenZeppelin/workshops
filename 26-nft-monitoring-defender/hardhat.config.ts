import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
// eslint-disable-next-line node/no-extraneous-import
import "hardhat-contract-sizer";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

// Dear Student,
//
// This hardhat.config.ts file differs from the Hardhat project boilerplate generated
// when you run `npx hardhat` in a new directory. We suggest you add these same lines
// of code to your future projects, in order to easily setup:
// - environment variables via `dotenv` (you'll need to `mv .env.example .env`)
// - Etherscan source verification
//
// Love,
// Macro Instruction Team

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      accounts: {
        count: 20,
        accountsBalance: "10000000000000000000000", // 10ETH (Default)
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
