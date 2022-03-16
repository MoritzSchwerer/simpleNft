const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NftURI", function () {
  let nft;
  let deployer;
  let user1;
  let user2;

  before(async function () {
    const NFT = await ethers.getContractFactory("NftURI");
    [deployer, user1, user2] = await ethers.getSigners();
    nft = await NFT.deploy();
    nft.deployed();
  });
  it("should set URI correctly", async function () {
    await nft.reward(user1.address, "https://www.google.com");
    const uri = await nft.tokenURI(1);
    expect(uri).to.equal("https://www.google.com");
  });
  it("should set URI correctly 2", async function () {
    await nft.reward(user2.address, "https://www.facebook.com");
    const uri = await nft.tokenURI(2);
    expect(uri).to.equal("https://www.facebook.com");
  });

});
