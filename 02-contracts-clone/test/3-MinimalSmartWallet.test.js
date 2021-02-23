async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

describe('factories', function() {
  const logs = [];

  for (const name of ['FactoryNaive', 'FactoryProxy', 'FactoryClone']) {
    describe(name, function() {
      before(async function() {
        this.factory = await deploy(name);
      });

      it('factory deployment cost', async function() {
        const { gasUsed } = await this.factory.deployTransaction.wait();
        logs.push({ name, operation: 'deployment', gasUsed });
      });

      it('wallet deployment cost', async function() {
        const tx = await this.factory.createWallet();
        const { gasUsed } = await tx.wait();
        logs.push({ name, operation: 'createWallet', gasUsed });
      });
    });
  }

  describe('Metrics', function() {
    it('display', async function() {
      logs.forEach(({ name, operation, gasUsed}, i) =>
        console.log(`${String(i).padStart(3)} | ${name.padEnd(12)} | ${operation.padEnd(20)} | ${gasUsed.toString().padStart(10)} gas`)
      );
    });
  });
});
