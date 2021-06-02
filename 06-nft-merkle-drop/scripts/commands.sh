npx hardhat run scripts/1-deploy.js --network localhost
export ADDRESS=
export TOKENID=
export ACCOUNT=
npx hardhat run scripts/2-sign.js --network localhost
export SIGNATURE=
npx hardhat run scripts/3-redeem.js --network localhost
