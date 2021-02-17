// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/metatx/BaseRelayRecipient.sol";
import "openzeppelin-solidity/contracts/metatx/MinimalForwarder.sol";

contract Registry is BaseRelayRecipient {  
  event Registered(address indexed who, string name);

  mapping(address => string) public names;
  mapping(string => address) public owners;

  constructor(MinimalForwarder forwarder) // Initialize trusted forwarder
    BaseRelayRecipient(address(forwarder)) {
  }

  function register(string memory name) external {
    require(owners[name] == address(0), "Name taken");
    address owner = _msgSender(); // Changed from msg.sender
    owners[name] = owner;
    names[owner] = name;
    emit Registered(owner, name);
  }
}
