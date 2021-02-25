async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

describe('Uniswap', function() {
  before(async function() {
    this.accounts = await ethers.getSigners();
  });

  describe('Native', function() {
    before(async function() {
      this.factory = await deploy('UniswapV2Factory', '0x18e433c7bf8a2e1d0197ce5d8f9afada1a771360');
    });

    it('create pair', async function() {
      await this.factory.createPair(
        this.accounts[1].address,
        this.accounts[2].address,
      );
    });
  });

  describe('With clones', function() {
    before(async function() {
      this.template = await deploy('UniswapV2PairClones');
      this.factory = await deploy('UniswapV2FactoryClones', this.template.address, '0x18e433c7bf8a2e1d0197ce5d8f9afada1a771360');
    });

    it('create pair', async function() {
      await this.factory.createPair(
        this.accounts[1].address,
        this.accounts[2].address,
      );
    });
  });
});
