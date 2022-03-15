// require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy');
require("@nomiclabs/hardhat-ethers");

module.exports = {
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  solidity: "0.8.4",
};
