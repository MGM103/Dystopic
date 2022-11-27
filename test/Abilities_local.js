const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params) {
    const newContract = await ethers.getContractFactory(name);
    return await newContract.deploy(...params).then(c => c.deployed());
}

describe("Abilities", () => {
    beforeEach(async () => {
        this.abilitiesContract = await deploy("Abilities");
       
        this.accounts = await ethers.getSigners();
    });

    it("Has the correct number of abilities", async () => {
        const expectedNumAbilities = 2;
        const numAbilities = await this.abilitiesContract.MAX_ABILITIES();
        
        expect(numAbilities).to.equal(expectedNumAbilities);
    });

    it("Sets initial ability", async () => {
        const tokenId = 1, level = 1, architype = 2;
        const attributes = {
            strength: 5, 
            speed: 5,
            fortitude: 5,
            technical: 2,
            instinct: 2,
            dexterity: 3,
            luck: 3
        }
        const invalidAbilities = [0, 5];

        for(i = 0; i < invalidAbilities.length; i++){
            await expect(
                this.abilitiesContract.setInitAbilities(tokenId, invalidAbilities[i], level, architype, attributes)
            ).to.be.revertedWith("Ability not found");
        }

        const abilityId = 4, invalidLvl = 0;

        await expect(
            this.abilitiesContract.setInitAbilities(tokenId, abilityId, invalidLvl, architype, attributes)
        ).to.be.revertedWith("Ability level requirement not met");

        const invalidArchitype = 1;

        await expect(
            this.abilitiesContract.setInitAbilities(tokenId, abilityId, level, invalidArchitype, attributes)
        ).to.be.revertedWith("Ability architype requirement not met");

        const invalidAttributes = {
            strength: 5, 
            speed: 5,
            fortitude: 5,
            technical: 0,
            instinct: 2,
            dexterity: 4,
            luck: 4
        };

        await expect(
            this.abilitiesContract.setInitAbilities(tokenId, abilityId, level, architype, invalidAttributes)
        ).to.be.revertedWith("Ability attribute requirements not met");

        let txn = await this.abilitiesContract.setInitAbilities(tokenId, abilityId, level, architype, attributes);
        expect(txn).to.emit(this.abilitiesContract, "initialisedAbilities");
        
        let idToAbilities = await this.abilitiesContract.idToAbilities(tokenId, 0);
        expect(idToAbilities).to.equal(abilityId);
        
        let initAbilitiesSet = await this.abilitiesContract.initAbilitiesSet(tokenId);
        expect(initAbilitiesSet).to.equal(true);

        await expect(
            this.abilitiesContract.setInitAbilities(tokenId, abilityId, level, architype, attributes)
        ).to.be.revertedWith("Initial ability has already been set");
    });
});