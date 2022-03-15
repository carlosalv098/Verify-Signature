const { ethers } = require("hardhat");

module.exports = async({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    log('Deploying Restricted Contract...');
    await deploy("RestrictedContract", {
        from: deployer,
        args: [],
        log: true
    })
}

module.exports.tags = ["all"];