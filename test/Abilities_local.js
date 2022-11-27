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

    describe("Set initial ability", async () => {
        const tokenId = 1, level = 1, architype = 2, numAbilities = 4, abilityId = 4;
        const attributes = {
            strength: 5, 
            speed: 5,
            fortitude: 5,
            technical: 2,
            instinct: 2,
            dexterity: 3,
            luck: 3
        }

        it("Ensures intial ability is valid ", async () => {
            const invalidAbilities = [0, numAbilities+1];
    
            for(i = 0; i < invalidAbilities.length; i++){
                await expect(
                    this.abilitiesContract.setInitAbilities(tokenId, invalidAbilities[i], level, architype, attributes)
                ).to.be.revertedWith("Ability not found");
            }
        });

        it("Ensures level requirement is met", async () => {
            const invalidLvl = 0;
    
            await expect(
                this.abilitiesContract.setInitAbilities(tokenId, abilityId, invalidLvl, architype, attributes)
            ).to.be.revertedWith("Ability level requirement not met");
        });

        it("Ensures architype requriement is met", async () => {
            const invalidArchitype = 1;
    
            await expect(
                this.abilitiesContract.setInitAbilities(tokenId, abilityId, level, invalidArchitype, attributes)
            ).to.be.revertedWith("Ability architype requirement not met");
        });

        it("Ensures attribute requirements are met", async () => {
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
        });
    
        context("Initial ability has been set", async () => {
            it("Sets ability correctly", async () => {
                let txn = await this.abilitiesContract.setInitAbilities(tokenId, abilityId, level, architype, attributes);
                expect(txn).to.emit(this.abilitiesContract, "initialisedAbilities");
            
                let idToAbilities = await this.abilitiesContract.idToAbilities(tokenId, 0);
                expect(idToAbilities).to.equal(abilityId);
            
                let initAbilitiesSet = await this.abilitiesContract.initAbilitiesSet(tokenId);
                expect(initAbilitiesSet).to.equal(true);
            });

            it("Does not allow ability to be re-initialised", async () => {
                await this.abilitiesContract.setInitAbilities(tokenId, abilityId, level, architype, attributes);

                await expect(
                    this.abilitiesContract.setInitAbilities(tokenId, abilityId, level, architype, attributes)
                ).to.be.revertedWith("Initial ability has already been set");
            });
        });
    });

    describe("Change existing ability", async () => {
        const tokenId = 1, level = 1, architype = 2, abilityAdd = 4, abilityRemove = 1;
        const numAbilities = 4;
        const attributes = {
            strength: 5, 
            speed: 5,
            fortitude: 5,
            technical: 2,
            instinct: 2,
            dexterity: 3,
            luck: 3
        };

        it("Ensures ability has been set", async () => {
            await expect(
                this.abilitiesContract.changeAbility(tokenId, abilityRemove, abilityAdd, level, architype, attributes)
            ).to.be.revertedWith("Abilities must be initialised before they can be changed");
        });

        context("Initial ability has been set", async () => {
            beforeEach(async () => {
                let txn = await this.abilitiesContract.setInitAbilities(tokenId, abilityRemove, level, architype, attributes);
                await txn.wait();
            });

            it("Ensures both abilities being removed and added are valid", async () => {
                const invalidAbilities = [0, numAbilities+1];

                for(i = 0; i < invalidAbilities.length; i++){
                    await expect(
                        this.abilitiesContract.changeAbility(tokenId, invalidAbilities[i], abilityAdd, level, architype, attributes)
                    ).to.be.revertedWith("Ability being changed not found");

                    await expect(
                        this.abilitiesContract.changeAbility(tokenId, abilityRemove, invalidAbilities[i], level, architype, attributes)
                    ).to.be.revertedWith("Ability being added not found");
                } 
            });

            it("Ensures change is not redundant", async () => {
                const invalidAbilityAdd = 1;
        
                await expect(
                    this.abilitiesContract.changeAbility(tokenId, abilityRemove, invalidAbilityAdd,  level, architype, attributes)
                ).to.be.revertedWith("Abilities are the same");
            });

            it("Ensures level requirement is met", async () => {
                const invalidLvl = 0;

                await expect(
                    this.abilitiesContract.changeAbility(tokenId, abilityRemove, abilityAdd, invalidLvl, architype, attributes)
                ).to.be.revertedWith("Ability level requirement not met");
            });

            it("Ensures architype requirement is met", async () => {
                const invalidArchitype = 1;
        
                await expect(
                    this.abilitiesContract.changeAbility(tokenId, abilityRemove, abilityAdd, level, invalidArchitype, attributes)
                ).to.be.revertedWith("Ability architype requirement not met");
            });

            it("Ensures attribute requirements are met", async () => {
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
                    this.abilitiesContract.changeAbility(tokenId, abilityRemove, abilityAdd, level, architype, invalidAttributes)
                ).to.be.revertedWith("Ability attribute requirements not met");
            });

            it("Ensures the ability being removed is present", async () => {
                invalidAbilityRemove = 2;

                await expect(
                    this.abilitiesContract.changeAbility(tokenId, invalidAbilityRemove, abilityAdd, level, architype, attributes)
                ).to.be.revertedWith("Ability to change is not present");
            });

            it("Changes attribute correctly", async () => {
                let txn = await this.abilitiesContract.changeAbility(tokenId, abilityRemove, abilityAdd, level, architype, attributes);
                expect(txn).to.emit("abilityChanged");

                let newAbility = await this.abilitiesContract.idToAbilities(tokenId, 0);
                expect(newAbility).to.equal(abilityAdd);
            });
        });
    });
});