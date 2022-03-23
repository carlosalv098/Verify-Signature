const { expect } = require("chai");
const { deployments, ethers } = require("hardhat");

describe("RestrictedContract", function () {

  let restrictedContract, contract_address, owner, user1, user2;

  before(async() => {
    [owner, user1, user2] = await ethers.getSigners();
    await deployments.fixture(["all"]);
    restrictedContract = await ethers.getContract("RestrictedContract");
    contract_address = restrictedContract.address;
  })

  it("Verify signature", async function () {
    
    const message = ethers.utils.solidityKeccak256(
      ['address', 'address'],
      [contract_address, owner.address]
    )
    console.log(`Message is: ${message}\n`);

    const arrayifyMessage = ethers.utils.arrayify(message);
    console.log(`Arrayify message is: ${arrayifyMessage}\n`);

    const flatSignature = await owner.signMessage(arrayifyMessage);
    console.log(`Flat signature is: ${flatSignature}\n`);

    // this should fail, user2 is not approved
    let tx = await restrictedContract.connect(user2).verifyMessage(flatSignature)
    let result = tx[1];
    expect(result).to.be.false;

    // this should pass, owner is approved
    tx = await restrictedContract.connect(owner).verifyMessage(flatSignature)
    result = tx[1];
    expect(result).to.be.true;
  });
});
