const { expect } = require("chai");
const { deployments, ethers } = require("hardhat");

describe("RestrictedContract", function () {

  let restrictedContract;

  before(async() => {
    await deployments.fixture(["all"]);
    restrictedContract = await ethers.getContract("RestrictedContract");
  })

  it("Verify signature", async function () {
    console.log(restrictedContract.address);
  });
});
