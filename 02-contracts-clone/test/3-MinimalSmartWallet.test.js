async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

describe('factories', function() {
  for (const name of ['FactoryNaive', 'FactoryProxy', 'FactoryClone']) {
    describe(name, function() {
      before(async function() {
        this.factory = await deploy(name);
      });

      it('factory deployment cost', async function() {
        await this.factory.deployTransaction.wait();
      });

      it('wallet deployment cost', async function() {
        await this.factory.createWallet();
      });
    });
  }
});
