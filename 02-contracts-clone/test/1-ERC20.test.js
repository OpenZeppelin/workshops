
async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

describe('factories', function() {
  for (const name of [ 'FactoryNaive', 'FactoryProxy', 'FactoryClone']) {
    describe(name, function() {
      before(async function() {
        this.accounts = await ethers.getSigners();
        this.factory = await deploy(name);
      });

      it('factory deployment cost', async function() {
        await this.factory.deployTransaction.wait();
      });

      it('wallet deployment cost', async function() {
        const tx1 = await this.factory.createToken('name', 'symbol', 1000, { from: this.accounts[0].address });
        const { gasUsed: createGasUsed, events } = await tx1.wait();
        const { address } = events.find(Boolean);
        console.log(`${name}.createToken: ${createGasUsed.toString()}`);

        const { interface } = await ethers.getContractFactory('ERC20PresetFixedSupplyUpgradeable');
        const instance = new ethers.Contract(address, interface, this.accounts[0]);
        const tx2 = await instance.transfer(this.accounts[1].address, 100, { from: this.accounts[0].address });
        const { gasUsed: transferGasUsed } = await tx2.wait();
        console.log(`ERC20.transfer:           ${transferGasUsed.toString()}`);
      });
    });
  }
});
