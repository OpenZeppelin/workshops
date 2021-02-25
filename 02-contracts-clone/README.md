# Contract Clones Workshop

Code for the workshop on Cheap smart contracts deployments through Clones using [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)

This project showcases usage of the clone library in order to improve the deployment of families of smart contracts. Clones, as described in [ERC1167](https://eips.ethereum.org/EIPS/eip-1167), are very small, and cheap to deploy, smart-contract that delegates all incoming calls to a master functionality contract. The address of this master contract being stored directly in the contract code, no `sload` is required.

The gas report produced by the tests shows the gas savings one can expect from using clones.

## Structure

- `contracts/1-ERC20`: Comparison of three different deployment mechanisms for ERC20 tokens.
- `contracts/2-uniswap`: Fork of [uniswap](https://uniswap.org/)'s `UniswapV2Factory` that uses EIP-1167 clones to deploy `UniswapV2Pair`
- `contracts/3-argent`: Fork of [argent](https://www.argent.xyz/)'s `WalletFactory` that uses EIP-1167 clones to deploy `WalletProxy`
- `test`: Tests for contracts.
- `hardhart.config.js`: Hardhat configuration, including compiler optimization options.

## Scripts

- `npm run compile`: Compile the contracts.
- `npm run test`: Run the tests and produce a gas usage report.

## Examples

1. **ERC20**

  - Description:

    In this example, we deploy ERC20 using different mechanisms. This allows us to compare the deployment and usage costs associated with the different deployment patterns.

  - Gas report:

    | Contract     | Methods        | Gas       |
    | ------------ | -------------- | --------: |
    | FactoryNaive | constructor    | 1,245,959 |
    | FactoryProxy | constructor    | 1,675,235 |
    | FactoryClone | constructor    | 1,305,848 |
    | FactoryNaive | createToken    | 1,179,977 |
    | FactoryProxy | createToken    |   368,401 |
    | FactoryClone | createToken    |   209,109 |
    | FactoryNaive | ERC20.transfer |    51,092 |
    | FactoryProxy | ERC20.transfer |    52,776 |
    | FactoryClone | ERC20.transfer |    51,870 |

2. **UniswapV2**

  - Description:

    Uniswap is one of the most widely adopted AMM-based decentralized exchanges in the ethereum ecosystem. Version 2, which is the latest version to date relies on a large set of liquidity pairs and a routing mechanism that allows the execution of more complex operations that combines multiple pairs.

    A uniswap pair corresponds to a pair of ERC20 compatible assets and is represented by an independent smart-contract, which holds the underlying asset and keeps track of liquidity providers for this particular pair.

    Anyone can create a uniswap pair contract for any ERC20s he desires. However, this operation has a significant gas cost associated with deploying and configuring the pair contract. This operation can be made cheaper using EIP-1167 clones instead of full-fledged contracts.

  - Gas report:

    | Contract               | Methods    | Gas       |
    | ---------------------- | ---------- | --------: |
    | UniswapV2Factory       | createPair | 2,020,039 |
    | UniswapV2FactoryClones | createPair |   218,099 |

  - Comment:

    While deployment cost is greatly reduced, each transaction (including internal transaction) to a pair will require an additional delegate call from the proxy to the `UniswapV2Pair` implementation. These delegate calls, while cheap on a "per-transaction" basis, will eventually make the clone option more expensive to the community.

    It is a good thing that UniswapV2 doesn't use clones for pairs like `ETH/DAI` or `ETH/USDC` that see a lot of volumes. However, some low-traffic pairs would have benefited from a cheap deployment.

  - Relevant contracts:
    - [UniswapV2Factory](https://etherscan.io/address/0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f#code)
    - [UniswapV2Pair for DAI/WETH](https://etherscan.io/address/0xa478c2975ab1ea89e8196811f51a7b7ade33eb11#code)

3. **Argent**

  - Description:

    Argent is an ethereum smart-contract-based non-custodial wallet. Its integration of DeFi primitives and its innovative social recovery mechanisms make it one of the best solutions available today.

    Each argent user has a dedicated smart-wallet that they control through meta-transactions. One of the consequences of this design is that onboarding new users requires deploying a smart contract for them. Argent already uses proxies to reduce the cost of new wallet creation, but they could go even further using EIP-1167 clones.

  - Gas report:

    | Contract            | Methods                    | Gas     |
    | ------------------- | -------------------------- | ------: |
    | WalletFactory       | createCounterfactualWallet | 322,302 |
    | WalletFactoryClones | createCounterfactualWallet | 265,422 |

  - Relevant contracts:
    - [WalletFactory (new with about 18.9k wallets)](https://etherscan.io/address/0x40c84310ef15b0c0e5c69d25138e0e16e8000fe9#code)
    - [WalletFactory (old with about 17.5k wallets)](https://etherscan.io/address/0x851cc731ce1613ae4fd8ec7f61f4b350f9ce1020#code)
