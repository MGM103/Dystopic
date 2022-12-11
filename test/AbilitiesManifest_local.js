const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params) {
    const newContract = await ethers.getContractFactory(name);
    return await newContract.deploy(...params).then(c => c.deployed());
}

describe("Attributes", () => {
    beforeEach(async () => {
        this.abilitiesManifest = await deploy("AbilitiesManifest");
        this.accounts = await ethers.getSigners();
    });

    it("Correctly outputs the total amount of abilities", async () => {
        const expectedTotal = 4;
        const totalAbilities = await this.abilitiesManifest.totalAbilities();

        expect(totalAbilities).to.equal(expectedTotal);
    });

    it("Outputs the correct modifiers for Armour Up", async () => {
        const statsIndex = 0, durationIndex = 1;
        const expectedStats = {
            meleeDmg: 0,
            rangedDmg: 0,
            health: 0,
            speed: 0,
            defence: 30,
            crit: 0,
            evasiveness: 0,
            elementResist: 0
        }
        const expectedDuration = 3;
        const attributeKeys = Object.keys(expectedStats);
        const abilityId = 1;

        let armourUpInfo = await this.abilitiesManifest.abilityToModifiers(abilityId);
        expect(armourUpInfo[durationIndex]).to.equal(expectedDuration);

        for(i = 0; i < attributeKeys.length; i++) {
            expect(armourUpInfo[statsIndex][attributeKeys[i]]).to.equal(expectedStats[attributeKeys[i]]);
        }
    });

    it("Lists the correct requirements for Armour Up", async () => {
        const abilityId = 1;
        const attrIndex = 2, lvlIndex = 0, architypeIndex = 1;
        const expectedLvl = 1;
        const expectedArchitype = 0;
        const expectedAttrReqs = {
            strength: 0,
            speed: 0,
            fortitude: 1,
            technical: 0,
            instinct: 0,
            dexterity: 0,
            luck: 0
        };
        const attributeKeys = Object.keys(expectedAttrReqs);

        let armourUpReqs = await this.abilitiesManifest.abilityToRequirements(abilityId);
        expect(armourUpReqs[lvlIndex]).to.equal(expectedLvl);
        expect(armourUpReqs[architypeIndex]).to.equal(expectedArchitype);

        for(i = 0; i < attributeKeys.length; i++){
            expect(armourUpReqs[attrIndex][attributeKeys[i]]).to.equal(expectedAttrReqs[attributeKeys[i]]);
        }
    });

    it("Outputs the correct modifiers for Camo", async () => {
        const statsIndex = 0, durationIndex = 1;
        const expectedDuration = 2;
        const expectedResult = {
            meleeDmg: 0,
            rangedDmg: 0,
            health: 0,
            speed: 0,
            defence: 0,
            crit: 0,
            evasiveness: 50,
            elementResist: 0
        }
        const attributeKeys = Object.keys(expectedResult);
        const abilityId = 2;

        let camoInfo = await this.abilitiesManifest.abilityToModifiers(abilityId);
        expect(camoInfo[durationIndex]).to.equal(expectedDuration);

        for(i = 0; i < attributeKeys.length; i++) {
            expect(camoInfo[statsIndex][attributeKeys[i]]).to.equal(expectedResult[attributeKeys[i]]);
        }
    });

    it("Lists the correct requirements for Camo", async () => {
        const abilityId = 2;
        const attrIndex = 2, lvlIndex = 0, architypeIndex = 1;
        const expectedLvl = 1;
        const expectedArchitype = 0;
        const expectedAttrReqs = {
            strength: 0,
            speed: 0,
            fortitude: 0,
            technical: 0,
            instinct: 0,
            dexterity: 1,
            luck: 0
        };
        const attributeKeys = Object.keys(expectedAttrReqs);

        let armourUpReqs = await this.abilitiesManifest.abilityToRequirements(abilityId);
        expect(armourUpReqs[lvlIndex]).to.equal(expectedLvl);
        expect(armourUpReqs[architypeIndex]).to.equal(expectedArchitype);

        for(i = 0; i < attributeKeys.length; i++){
            expect(armourUpReqs[attrIndex][attributeKeys[i]]).to.equal(expectedAttrReqs[attributeKeys[i]]);
        }
    });

    it("Outputs the correct modifiers for Rage", async () => {
        const statsIndex = 0, durationIndex = 1;
        const expectedDuration = 2;
        const expectedResult = {
            meleeDmg: 20,
            rangedDmg: 20,
            health: 0,
            speed: 0,
            defence: 0,
            crit: 10,
            evasiveness: 0,
            elementResist: 0
        }
        const attributeKeys = Object.keys(expectedResult);
        const abilityId = 3;

        let rageInfo = await this.abilitiesManifest.abilityToModifiers(abilityId);
        expect(rageInfo[durationIndex]).to.equal(expectedDuration);

        for(i = 0; i < attributeKeys.length; i++) {
            expect(rageInfo[statsIndex][attributeKeys[i]]).to.equal(expectedResult[attributeKeys[i]]);
        }
    });

    it("Lists the correct requirements for Camo", async () => {
        const abilityId = 3;
        const attrIndex = 2, lvlIndex = 0, architypeIndex = 1;
        const expectedLvl = 1;
        const expectedArchitype = 0;
        const expectedAttrReqs = {
            strength: 1,
            speed: 0,
            fortitude: 0,
            technical: 0,
            instinct: 0,
            dexterity: 0,
            luck: 0
        };
        const attributeKeys = Object.keys(expectedAttrReqs);

        let armourUpReqs = await this.abilitiesManifest.abilityToRequirements(abilityId);
        expect(armourUpReqs[lvlIndex]).to.equal(expectedLvl);
        expect(armourUpReqs[architypeIndex]).to.equal(expectedArchitype);

        for(i = 0; i < attributeKeys.length; i++){
            expect(armourUpReqs[attrIndex][attributeKeys[i]]).to.equal(expectedAttrReqs[attributeKeys[i]]);
        }
    });

    it("Outputs the correct modifiers for Precision", async () => {
        const statsIndex = 0, durationIndex = 1;
        const expectedDuration = 1;
        const expectedResult = {
            meleeDmg: 0,
            rangedDmg: 0,
            health: 0,
            speed: 0,
            defence: 0,
            crit: 100,
            evasiveness: 0,
            elementResist: 0
        }
        const attributeKeys = Object.keys(expectedResult);
        const abilityId = 4;

        let precisionInfo = await this.abilitiesManifest.abilityToModifiers(abilityId);
        expect(precisionInfo[durationIndex]).to.equal(expectedDuration);

        for(i = 0; i < attributeKeys.length; i++) {
            expect(precisionInfo[statsIndex][attributeKeys[i]]).to.equal(expectedResult[attributeKeys[i]]);
        }
    });

    it("Lists the correct requirements for Precision", async () => {
        const abilityId = 4;
        const attrIndex = 2, lvlIndex = 0, architypeIndex = 1;
        const expectedLvl = 1;
        const expectedArchitype = 2;
        const expectedAttrReqs = {
            strength: 0,
            speed: 0,
            fortitude: 0,
            technical: 1,
            instinct: 0,
            dexterity: 1,
            luck: 1
        };
        const attributeKeys = Object.keys(expectedAttrReqs);

        let armourUpReqs = await this.abilitiesManifest.abilityToRequirements(abilityId);
        expect(armourUpReqs[lvlIndex]).to.equal(expectedLvl);
        expect(armourUpReqs[architypeIndex]).to.equal(expectedArchitype);

        for(i = 0; i < attributeKeys.length; i++){
            expect(armourUpReqs[attrIndex][attributeKeys[i]]).to.equal(expectedAttrReqs[attributeKeys[i]]);
        }
    });

    it("Returns the correct string for the ability", async () => {
        const abilityStrs = [
            "Armour Up",
            "Camo",
            "Rage",
            "Precision"
        ];

        for(i = 1; i <= abilityStrs.length; i++){
            let ability = await this.abilitiesManifest.abilityToStr(i);
            expect(ability).to.equal(abilityStrs[i-1]);
        }
    });
})