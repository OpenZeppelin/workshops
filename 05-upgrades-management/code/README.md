# Managing Smart Contract Upgrades Workshop

This folder contains the code used during the Managing Smart Contract Upgrades Workshop we led in Apr 22nd, 2021.

It is a Hardhat project, with some iterations on a simple `Box` contract, and a handful of Hardhat scripts to manage its upgrades. 

## Installing

Check out this folder to your local environment, and run:

`npm install`

## Configuring

All necessary configuration variables are sourced through a `.env` file at the root level of this folder. 

Create a `.env` file and make sure it defines the env required variables. Your `.env` should look like this:

```
MNEMONIC=<your Ethereum development account mnemonic>
INFURA_API_KEY=<key to an Infura project under your control>
DEFENDER_TEAM_API_KEY=<Defender API key with permissions to interact with Admin>
DEFENDER_TEAM_API_SECRET_KEY=<secret key corresponding to the team API key above>
```

Some resources to help you get each of this:

1. MNEMONIC:
   1. https://ethereum.org/en/glossary/#hd-wallet-seed
   2. https://ethereum.org/en/developers/docs/accounts/
2. INFURA_API_KEY:
   1. https://infura.io/docs/ethereum#section/Securing-Your-Credentials
3. DEFENDER Team API keys: https://docs.openzeppelin.com/defender/guide-upgrades#create-defender-team-api-key

## Deploying an upgradeable contract

To deploy the initial version of Box simply run:

`npx hardhat run --network rinkeby scripts/deploy.js`.

If it succeeds, the script will print the address of your contract (aka the Proxy) to the console. Write down that address, as it is the one through which you'll manage your contract from now on.

## Upgrading to BoxV2

In `scripts/upgrade.js`, replace the proxy address with the one you got from the deployment script, then run:

`npx hardhat run --network rinkeby scripts/upgrade.js`

## Transferring upgrade rights to a multisig

Go to `rinkeby.gnosis-safe.io` and create a multisig. Then copy its address and, in `scripts/transfer-ownership.js`, replace the `gnosisSafe` variable with your own multisig address. Be EXTRA CAREFUL in this step, if you call this script with the wrong address, you'll lose control of your contract's upgrades. Run:

`npx hardhat run --network rinkeby scripts/transfer-ownership.js`

Note: we're working on letting you create Safe multisigs from Defender, so stay tuned for simplifications of this step! :-)

## Creating Defender Admin Upgrade proposals from this project

Take a look at `scripts/propose-upgrade.js`. The main moving parts are: the address of your contract (aka Proxy), the version of the contract you want to upgrade to, and the proposal metadata object where you can set `title` and `description` attributes to provide a high level overview of what you're trying to accomplish with this upgrade. Make sure all of those point to the right stuff and then run:

`npx hardhat run --network rinkeby scripts/propose-upgrade.js`

If the script succeeds, you'll get a proposal URL printed to the console. Navigate to that link and you'll see the upgrade proposal in Defender, ready to approve and/or execute.