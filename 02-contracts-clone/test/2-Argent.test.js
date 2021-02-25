async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

describe('Argent', function() {
  before(async function () {
    this.implementation  = await deploy('BaseWallet');
    this.moduleRegistry  = await deploy('ModuleRegistry');
    this.guardianStorage = await deploy('GuardianStorage');
    this.versionmanager  = await deploy(
      'VersionManager',
      this.moduleRegistry.address,
      this.guardianStorage.address,
      ethers.constants.AddressZero,
      ethers.constants.AddressZero,
      ethers.constants.AddressZero);
    await this.versionmanager.addVersion([], []);

    this.accounts       = await ethers.getSigners();
    this.infrastructure = this.accounts[0];
    this.owner          = this.accounts[1];
    this.guardian       = this.accounts[2];
    this.other          = this.accounts[3];
    this.refundAddress  = this.accounts[4];
  });

  for (const name of [ 'WalletFactory', 'WalletFactoryClones' ]) {
    describe(name, function() {
      before(async function() {
        this.factory = await deploy(
          name,
          this.implementation.address,
          this.guardianStorage.address,
          this.refundAddress.address,
        );
        await this.factory.addManager(this.infrastructure.address);
      });

      it('create wallet', async function() {
        await this.factory.createCounterfactualWallet(
          this.owner.address,
          this.versionmanager.address,
          this.guardian.address,
          ethers.utils.randomBytes(20),
          1,
          0,
          ethers.constants.AddressZero,
          "0x",
          "0x",
        );
      });
    });
  }
});
