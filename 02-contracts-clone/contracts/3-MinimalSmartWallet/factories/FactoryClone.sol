// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "../MinimalSmartWallet.sol";

contract FactoryClone {
    address immutable walletImplementation;

    constructor() public {
        walletImplementation = address(new MinimalSmartWallet());
    }

    function createWallet() external returns (address) {
        address clone = Clones.clone(walletImplementation);
        MinimalSmartWallet(payable(clone)).initialize(msg.sender);
        return clone;
    }
}
