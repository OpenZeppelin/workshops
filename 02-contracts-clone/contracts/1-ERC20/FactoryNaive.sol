// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts-upgradeable/presets/ERC20PresetFixedSupplyUpgradeable.sol";

contract FactoryNaive {
    function createToken(string calldata name, string calldata symbol, uint256 initialSupply) external returns (address) {
        ERC20PresetFixedSupplyUpgradeable token = new ERC20PresetFixedSupplyUpgradeable();
        token.initialize(name, symbol, initialSupply, msg.sender);
        return address(token);
    }
}
