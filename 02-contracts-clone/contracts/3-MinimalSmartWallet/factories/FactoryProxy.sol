// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/proxy/UpgradeableProxy.sol";
import "../MinimalSmartWallet.sol";

contract FactoryProxy {
    address immutable walletImplementation;

    constructor() public {
        walletImplementation = address(new MinimalSmartWallet());
    }

    function createWallet() external returns (address) {
        UpgradeableProxy proxy = new UpgradeableProxy(
            walletImplementation,
            abi.encodeWithSelector(MinimalSmartWallet(0).initialize.selector, msg.sender)
        );
        return address(proxy);
    }
}
