import hre from 'hardhat';
import assert from 'assert';

before('get factories', async function () {
  this.Mars = await hre.ethers.getContractFactory('Mars');
  // this.MarsV2 = await hre.ethers.getContractFactory('MarsV2');
});

it('goes to mars', async function () {
  const supply = hre.ethers.utils.parseUnits('10', '18');
  const mars = await hre.upgrades.deployProxy(this.Mars, [supply]);

  assert(await mars.name() === 'Mars');

  const marsV2 = await hre.upgrades.upgradeProxy(mars, this.MarsV2);
  assert(await marsV2.version() === 'v2!');
});
