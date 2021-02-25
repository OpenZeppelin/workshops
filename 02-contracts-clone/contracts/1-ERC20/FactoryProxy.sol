// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts-upgradeable/presets/ERC20PresetFixedSupplyUpgradeable.sol";
import "@openzeppelin/contracts/proxy/UpgradeableProxy.sol";

contract FactoryProxy {
    address immutable tokenImplementation;

    constructor() public {
        tokenImplementation = address(new ERC20PresetFixedSupplyUpgradeable());
    }

    function createToken(string calldata name, string calldata symbol, uint256 initialSupply) external returns (address) {
        UpgradeableProxy proxy = new UpgradeableProxy(
            tokenImplementation,
            abi.encodeWithSelector(ERC20PresetFixedSupplyUpgradeable(0).initialize.selector, name, symbol, initialSupply, msg.sender)
        );
        return address(proxy);
    }
}
