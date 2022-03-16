const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ValueNft", function () {
  let nft;
  let deployer;
  let user1;
  let user2;

  before(async function () {
    const NFT = await ethers.getContractFactory("ValueNft");
    [deployer, user1, user2] = await ethers.getSigners();
    nft = await NFT.deploy();
    nft.deployed();
  });
  it("should set value correctly 1", async function () {
    await nft.reward(user1.address, 1);
    const value = await nft.userValue(user1.address);
    expect(value).to.equal(1);
    const total = await nft.totalValue();
    expect(total).to.equal(1);
  });
  it("should set value correctly 2", async function () {
    await nft.reward(user2.address, 500);
    const value = await nft.userValue(user2.address);
    expect(value).to.equal(500);
    const total = await nft.totalValue();
    expect(total).to.equal(501);
  });
  it("user1 should not be able to mint himselfe", async function () {
    await expect(nft.connect(user1).reward(user1.address, 500))
      .to.be.revertedWith("ValueNft: only minter can mint");
  });
  it("user2 should not be able to mint himselfe", async function () {
    await expect(nft.connect(user2).reward(user2.address, 500))
      .to.be.revertedWith("ValueNft: only minter can mint");
  });
});
