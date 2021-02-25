// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MinimalSmartWallet is OwnableUpgradeable {
    receive() external payable {}

    function initialize(address owner) external {
        require(OwnableUpgradeable.owner() == address(0));
        __Ownable_init();
        transferOwnership(owner);
    }

    function execute(address to, uint256 value, bytes calldata data) external payable onlyOwner() {
        if (AddressUpgradeable.isContract(to)) {
            AddressUpgradeable.functionCallWithValue(to, data, value);
        } else {
            AddressUpgradeable.sendValue(payable(to), value);
        }
    }
}
