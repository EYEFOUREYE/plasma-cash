const CryptoCards = artifacts.require("CryptoCards");
const RootChain = artifacts.require("RootChain");
const ValidatorManagerContract = artifacts.require("ValidatorManagerContract");

module.exports = async function(deployer, network, accounts) {

    deployer.deploy(ValidatorManagerContract).then(async () => {
        const vmc = await ValidatorManagerContract.deployed();
        console.log(`ValidatorManagerContract deployed at address: ${vmc.address}`);

        await deployer.deploy(RootChain, vmc.address);
        const root = await RootChain.deployed();
        console.log(`RootChain deployed at address: ${root.address}`);

        await deployer.deploy(CryptoCards, root.address);
        const cards = await CryptoCards.deployed();
        console.log(`CryptoCards deployed at address: ${cards.address}`);

        await vmc.toggleToken(cards.address);
    });
};

