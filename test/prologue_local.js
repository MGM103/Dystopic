const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params) {
    const newContract = await ethers.getContractFactory(name);
    return await newContract.deploy(...params).then(c => c.deployed());
}

describe("Prologue", async () => {
    beforeEach(async () => {
        const xp = 10;
        const reward = 20;
        const enemyVariants = [1];
        const loot = [1, 2];
        const imageURIs = [
            "https://i.pinimg.com/564x/f7/cc/b5/f7ccb5a281a6c12773eb486b369d7f89.jpg",
            "https://i.pinimg.com/564x/55/b9/04/55b9046000c50ce93fb17da7c2abe6a7.jpg",
            "https://i.pinimg.com/564x/dd/6f/47/dd6f4703cd14c56af1fab2cbb6e5eb7c.jpg"
        ]

        this.dystopicContract = await deploy("Dystopik", imageURIs);
        this.wpnContract = await deploy("Weapons");
        this.prologueContract = await deploy(
            "Prologue", 
            this.dystopicContract.address, 
            this.wpnContract.address,
            xp, enemyVariants, reward, loot
        );
        this.accounts = await ethers.getSigners();
    });

    it("Emits an event when a quest has begun", async () => {
        const tokenId = 1;

        await expect(
            this.prologueContract.beginQuest(tokenId)
        ).to.emit(this.prologueContract, "BeganQuest");
    });

    it("Emits an event when a quest has been aborted", async () => {
        const tokenId = 1;

        await expect(
            this.prologueContract.abortQuest(tokenId)
        ).to.emit(this.prologueContract, "AbortedQuest");
    });

    it("Emits an event when a quest has been completed", async () => {
        const tokenId = 1, architype = 1, expectedWpnId = 1;
        const role = await this.dystopicContract.XP_GIVER();
        const owner = this.accounts[0].address;

        let txn = await this.dystopicContract.createCharacter(architype);
        await txn.wait();

        await this.dystopicContract.grantRole(
            role,
            this.prologueContract.address
        );

        await this.dystopicContract.approve(this.prologueContract.address, tokenId);

        await expect(
            this.prologueContract.completeQuest(owner, tokenId)
        ).to.emit(this.prologueContract, "CompletedQuest");
        
        txn = await this.wpnContract.ownerToWpnIds(owner, 0);
        expect(txn).to.equal(expectedWpnId);
    });
})