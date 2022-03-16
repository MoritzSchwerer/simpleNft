const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleNft", function () {
  let nft;
  let deployer;
  let user1;
  let user2;

  before(async function () {
    const NFT = await ethers.getContractFactory("SimpleNft");
    [deployer, user1, user2] = await ethers.getSigners();
    nft = await NFT.deploy();
    nft.deployed();
  });

  it("Should set name correctly", async function () {
    const name = await nft.name();
    expect(name).to.equal("RewardToken");
  });
  it("Should set symbol correctly", async function () {
    const symbol = await nft.symbol();
    expect(symbol).to.equal("RT");
  });

  it("Should mint nft for user", async function () {
    await nft.reward(user1.address);
    const balanceOfUser1 = await nft.balanceOf(user1.address);
    const balanceOfUser2 = await nft.balanceOf(user2.address);
    expect(balanceOfUser1).to.equal(1);
    expect(balanceOfUser2).to.equal(0);
  });

  it("Should transfer nft to new holder", async function () {
    await nft.connect(user1)["safeTransferFrom(address,address,uint256)"]
      (user1.address, user2.address, 1);

    const balanceOfUser1 = await nft.balanceOf(user1.address);
    const balanceOfUser2 = await nft.balanceOf(user2.address);

    expect(balanceOfUser1).to.equal(0);
    expect(balanceOfUser2).to.equal(1);
  });

});
