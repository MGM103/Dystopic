const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params) {
    const newContract = await ethers.getContractFactory(name);
    return await newContract.deploy(...params).then(c => c.deployed());
}

describe("Stats", async () => {
    beforeEach(async () => {
        const imageURIs = [
            "https://i.pinimg.com/564x/f7/cc/b5/f7ccb5a281a6c12773eb486b369d7f89.jpg",
            "https://i.pinimg.com/564x/55/b9/04/55b9046000c50ce93fb17da7c2abe6a7.jpg",
            "https://i.pinimg.com/564x/dd/6f/47/dd6f4703cd14c56af1fab2cbb6e5eb7c.jpg"
        ]
        const strength = 5, speed = 5, fortitude = 5, technical = 2, instinct = 2, dexterity = 3, luck = 3;
        
        this.dystopicContract = await deploy("Dystopic", imageURIs);
        this.attributesContract = await deploy(
            "Attributes", 
            this.dystopicContract.address
        );
        this.statsContract = await deploy(
            "Stats", 
            this.dystopicContract.address,
            this.attributesContract.address
        );

        const totalArchitypes = await this.dystopicContract.totalArchitypes();

        for(i = 1; i <= totalArchitypes; i++){
            await this.dystopicContract.createCharacter(i);
            await this.attributesContract.setInitAttributes(i, strength, speed, fortitude, technical, instinct, dexterity, luck);
        }
       
        this.accounts = await ethers.getSigners();
    });

    it("Calculates Melee Damage Correctly", async () => {
        const charIds = [1 , 2, 3];
        const expectedResults = [750, 840, 900];

        for(i = 1; i <= charIds.length; i++) {
            stats = await this.statsContract.getStats(i);
            meleeDmg = stats.meleeDmg;
            expect(meleeDmg).to.equal(expectedResults[i-1]);
        }
    });

    it("Calculates Ranged Damage Correctly", async () => {
        const charIds = [1 , 2, 3];
        const expectedResults = [360, 335, 510];

        for(i = 1; i <= charIds.length; i++) {
            stats = await this.statsContract.getStats(i);
            rngDmg = stats.rangedDmg;
            expect(rngDmg).to.equal(expectedResults[i-1]);
        }
    });

    it("Calculates Defence Correctly", async () => {
        const charIds = [1 , 2, 3];
        const expectedResults = [950, 690, 520];

        for(i = 1; i <= charIds.length; i++) {
            stats = await this.statsContract.getStats(i);
            defence = stats.defence;
            expect(defence).to.equal(expectedResults[i-1]);
        }
    });

    it("Calculates Evasiveness Correctly", async () => {
        const charIds = [1 , 2, 3];
        const expectedResults = [300, 360, 340];

        for(i = 1; i <= charIds.length; i++) {
            stats = await this.statsContract.getStats(i);
            evade = stats.evasiveness;
            expect(evade).to.equal(expectedResults[i-1]);
        }
    });

    it("Calculates Health Correctly", async () => {
        const charIds = [1 , 2, 3];
        const expectedResults = [1100, 700, 600];

        for(i = 1; i <= charIds.length; i++) {
            stats = await this.statsContract.getStats(i);
            health = stats.health;
            expect(health).to.equal(expectedResults[i-1]);
        }
    });

    it("Calculates Element Reistance Correctly", async () => {
        const charIds = [1 , 2, 3];
        const expectedResults = [870, 530, 470];

        for(i = 1; i <= charIds.length; i++) {
            stats = await this.statsContract.getStats(i);
            elementResist = stats.elementResist;
            expect(elementResist).to.equal(expectedResults[i-1]);
        }
    });

    it("Calculates Crit Chance Correctly", async () => {
        const charIds = [1 , 2, 3];
        const expectedResults = [400, 500, 300];

        for(i = 1; i <= charIds.length; i++) {
            stats = await this.statsContract.getStats(i);
            crit = stats.crit;
            expect(crit).to.equal(expectedResults[i-1]);
        }
    });

    it("Calculates Speed Correctly", async () => {
        const charIds = [1 , 2, 3];
        const expectedResults = [490, 500, 585];

        for(i = 1; i <= charIds.length; i++) {
            stats = await this.statsContract.getStats(i);
            speed = stats.speed;
            expect(speed).to.equal(expectedResults[i-1]);
        }
    });
})