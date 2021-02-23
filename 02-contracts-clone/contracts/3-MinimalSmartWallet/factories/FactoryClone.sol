// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "../MinimalSmartWallet.sol";

contract FactoryClone {
    address immutable model;

    constructor() public {
        model = address(new MinimalSmartWallet());
    }

    function createWallet() external returns (address) {
        address clone = Clones.clone(model);
        MinimalSmartWallet(payable(clone)).initialize(msg.sender);
        return clone;
    }
}
