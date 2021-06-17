// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Mars is Initializable, ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {
    function initialize(uint supply) public initializer {
        __ERC20_init("Mars", "MARS");
        __Ownable_init();

        _mint(msg.sender, supply);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}

contract MarsV2 is Mars {
    function version() pure public returns (string memory) {
        return "v2!";
    }
}
