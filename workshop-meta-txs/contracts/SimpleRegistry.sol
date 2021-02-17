// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleRegistry {  
  event Registered(address indexed who, string name);

  mapping(address => string) public names;
  mapping(string => address) public owners;

  function register(string memory name) external {
    require(owners[name] == address(0), "Name taken");
    address owner = msg.sender;
    owners[name] = owner;
    names[owner] = name;
    emit Registered(owner, name);
  }
}
