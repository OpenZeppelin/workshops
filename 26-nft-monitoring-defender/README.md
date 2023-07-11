# OpenZeppelin Workshop: ETHCC 2023: NFT Contract Monitoring

This project demonstrates a basic NFT contract, as well as a defender-serverless config to launch your own automation and monitoring stack to your free OpenZeppelin Defender account. 

## You will need:
- VS Code or your favorite editor
- GitHub account
- Free Defender account available at defender.openzeppelin.com
- Metamask browser wallet for interacting with NFT contract via Defender
- Test ETH for Goerli or other testnet (https://goerli-faucet.pk910.de/)
- Etherscan API key for easy CLI-based contract verification
- The serverless CLI tool: `npm install -g serverless` and [Node](https://nodejs.org/en).  You may also need to run 

## To configure the repo and set up a Defender stack, do the following:
1. Clone this GitHub repo to your local environment
1. Enter the directory and run `yarn install`
1. Paste in an NFT (we'll use ERC721) contract from [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard) in the NFT.sol file and rename it to your token name, being sure to select 'Mintable', 'Pausable', and 'Roles' (you can select or ignore the rest--do NOT select Upgradeability though as it will complicate our deployment)
1. Run `npx hardhat compile` to generate abis, typings, etc.
2. Rename or copy env.example to .env and fill in the values with your private key, Defender API key and secret (from your free Defender account at defender.openzeppelin.com, click the gear icon at upper right), an Etherscan API key for contract verification, and a URL to whatever network's JSON RPC you'd like to deploy to--you can get a free key and JSON RPC connection URL at alchemy.com
3. Deploy the contract: `npx ts-node ./scripts/deploy.ts` and copy your new address
4. Now verify it: `npx hardhat verify  --network <NETWORK_NAME ex: goerli>  0xContract_Address`
5. Set up the `serverless.yml` file with your contract address, etc.
6. Copy `secrets-example.yml` and rename to `secrets.yml` and fill in the missing values: Defender API Key and Secret, and email address (this prevents your email address and any other sensitive info from getting stored in GitHub as secrets.yml is in the .gitignore along with .env)
7. To deploy your Defender NFT contract monitoring stack, enter the `defender/` directory and run `sls deploy --config serverless.yml`
8. Open up your Defender account and see what you've set up
9. IMPORTANT: Now go into Defender and copy you Relayer's address.  Go to Defender Admin, connect your Metamask (the one whose private key you used to deploy the contract) and grant the pauser role to your Relayer.
10. Don't forget to send a small amount of Goerli (or whatever network you've deployed to) ETH to the Relayer so that it can pay for its automated contract transactions!  Just .02 or less should be plenty.

## Triggering Pause With Defender:

Since this example assumes that the deployer is the only minter, simply go to Defender Admin and select your contract (can add manually if it doesn't appear).  Trigger the Sentinel by granting the Minter role to any address--your Relayer, or favorite degen, for example--and selecting 'EOA' under approval--this is your Metamask account.

Once you click 'Approve and Execute', the Sentinel will be alerted, and trigger the autotask to pause your contract.  No renegade minting on this contract! 👮

You can also manually unpause your contract from the Admin dashboard.