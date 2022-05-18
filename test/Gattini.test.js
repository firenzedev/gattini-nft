const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

const BASE_URI = "ipfs://myresourcecid/";

describe("Gattini", () => {
    let contract, owner, user, price;

    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();

        const contractFactory = await ethers.getContractFactory("Gattini");
        contract = await contractFactory.deploy(BASE_URI);
        await contract.deployed();

        price = await contract.tokenPrice();
    });

    it("should let a user mint a single NFT", async () => {
        expect(await contract.tokenCounter()).to.equal(0);
        
        await contract.connect(user).mint(1, { value: price });

        expect(await contract.tokenCounter()).to.equal(1);
        expect(await contract.balanceOf(user.address)).to.equal(1);
    });

    it("should let a user mint several NFTs", async () => {
        expect(await contract.tokenCounter()).to.equal(0);
        
        await contract.connect(user).mint(10, { value: price.mul(10) });

        expect(await contract.tokenCounter()).to.equal(10);
        expect(await contract.balanceOf(user.address)).to.equal(10);
    });

    it("should prevent minting if max supply is exceeded", async () => {
        await contract.connect(user).mint(190, { value: price.mul(190) });
        expect(await contract.tokenCounter()).to.equal(190);        
        await expect(contract.connect(user).mint(11, { value: price.mul(11) })).to.be.revertedWith("max supply exceeded");

        await contract.connect(user).mint(10, { value: price.mul(10) });
        expect(await contract.tokenCounter()).to.equal(200);
        await expect(contract.connect(user).mint(1, { value: price })).to.be.revertedWith("max supply exceeded");
    });

    it("should prevent minting if transaction value is not enough to buy the NFTs", async () => {
        await expect(contract.connect(user).mint(1)).to.be.revertedWith("not enough ethers");
        await expect(contract.connect(user).mint(1, { value: price.sub(1) })).to.be.revertedWith("not enough ethers");
        await expect(contract.connect(user).mint(10, { value: price.mul(9) })).to.be.revertedWith("not enough ethers");
    });

    it("should let only the contract owner to withdraw the contract balance", async () => {
        const ownerInitialBalance = await owner.getBalance();
        const contractBalance = price.mul(100);
        await contract.connect(user).mint(100, { value: contractBalance });
        
        await expect(contract.connect(user).withdraw()).to.be.reverted;

        const txn = await contract.connect(owner).withdraw();
        const response = await txn.wait();
        const transferred = contractBalance.sub(response.gasUsed * response.effectiveGasPrice);
        expect(await owner.getBalance()).to.equal(ownerInitialBalance.add(transferred));
    });
});