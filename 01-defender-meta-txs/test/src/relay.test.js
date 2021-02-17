const { expect } = require("chai").use(require('chai-as-promised'));
const { ethers } = require("hardhat");
const { signMetaTxRequest } = require("../../src/signer");
const { relay } = require('../../autotasks/relay');

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

describe("autotasks/relay", function() {
  beforeEach(async function() {
    this.forwarder = await deploy('MinimalForwarder');
    this.registry = await deploy("Registry", this.forwarder.address);    
    this.accounts = await ethers.getSigners();
    this.signer = this.accounts[2];
  });

  it("registers a name via a meta-tx", async function() {
    const { forwarder, registry, signer } = this;

    const { request, signature } = await signMetaTxRequest(signer.provider, forwarder, {
      from: signer.address,
      to: registry.address,
      data: registry.interface.encodeFunctionData('register', ['meta-txs']),
    });
    
    const whitelist = [registry.address]
    await relay(forwarder, request, signature, whitelist);

    expect(await registry.owners('meta-txs')).to.equal(signer.address);
    expect(await registry.names(signer.address)).to.equal('meta-txs');
  });

  it("refuses to send to non-whitelisted address", async function() {
    const { forwarder, registry, signer } = this;

    const { request, signature } = await signMetaTxRequest(signer.provider, forwarder, {
      from: signer.address,
      to: registry.address,
      data: registry.interface.encodeFunctionData('register', ['meta-txs']),
    });
    
    const whitelist = [];
    await expect(
      relay(forwarder, request, signature, whitelist)
    ).to.be.rejectedWith(/rejected/i);
  });

  it("refuses to send incorrect signature", async function() {
    const { forwarder, registry, signer } = this;

    const { request, signature } = await signMetaTxRequest(signer.provider, forwarder, {
      from: signer.address,
      to: registry.address,
      data: registry.interface.encodeFunctionData('register', ['meta-txs']),
      nonce: 5,
    });
    
    const whitelist = [registry.address]
    await expect(
      relay(forwarder, request, signature, whitelist)
    ).to.be.rejectedWith(/invalid/i);
  });
});
