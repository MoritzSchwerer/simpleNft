const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SelfMintNft", function () {
  let nft;
  let deployer;
  let user1;
  let user2;

  before(async function () {
    const NFT = await ethers.getContractFactory("SelfMintNft");
    [deployer, user1, user2] = await ethers.getSigners();
    nft = await NFT.deploy();
    nft.deployed();
  });

  it("should be able to mint", async function () {
    await expect(nft.connect(user2).mint({value: 1}))
      .to.not.be.reverted;
    const user2Balance = await nft.balanceOf(user2.address);
    expect(user2Balance).to.equal(1);
  });

  it("should not be able to mint when value is 0", async function () {
    await expect(nft.connect(user1).mint({value: 0}))
      .to.be.revertedWith("ValueNft: value must be greater than 0");
    const user1Balance = await nft.balanceOf(user1.address);
    expect(user1Balance).to.equal(0);
  });

});
