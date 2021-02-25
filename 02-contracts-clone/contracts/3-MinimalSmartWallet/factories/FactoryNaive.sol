// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "../MinimalSmartWallet.sol";

contract FactoryNaive {
    function createWallet() external returns (address) {
        MinimalSmartWallet wallet = new MinimalSmartWallet();
        wallet.initialize(msg.sender);
        return address(wallet);
    }
}
