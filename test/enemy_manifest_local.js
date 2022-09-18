const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params){
    const newContract = await ethers.getContractFactory(name);
    return await newContract.deploy(...params).then(c => c.deployed());
}

describe("EnemyManifest", async () => {
    beforeEach(async ()=> {
        this.manifest = await deploy("EnemyManifest");
        this.accounts = await ethers.getSigners();
    });

    it("Returns the correct amount of enemy variants", async () => {
        let expectedEnemies = 2;

        let enemies = await this.manifest.totalEnemyVariants();

        expect(enemies).to.equal(expectedEnemies);
    });

    it("Reverts when given an incorrect enemy ID", async () => {
        let invIdUpper = await this.manifest.totalEnemyVariants() + 1;
        let invIdLower = 0;
        await expect(this.manifest.enemyIdToEnemyStats(invIdUpper)).to.be.revertedWith("Enemy does not exist");
        await expect(this.manifest.enemyIdToEnemyStats(invIdLower)).to.be.revertedWith("Enemy does not exist");
    });

    it("Returns the correct stats for enemies", async () => {
        let totalEnemies = await this.manifest.totalEnemyVariants();
        let expectedVals = [
            {
                damageMin: 1,
                damageMax: 3,
                critChance: 2,
                speed: 10,
                health: 20,
                defence: 0,
                evasiveness: 1,
                accuracy: 95,
                elementResist: 0
            },
            {
                damageMin: 2,
                damageMax: 4,
                critChance: 2,
                speed: 15,
                health: 12,
                defence: 5,
                evasiveness: 3,
                accuracy: 96,
                elementResist: 0
            },
        ];
        keys = Object.keys(expectedVals[0]);

        for(i = 1; i <= totalEnemies.toNumber(); i++){
            txn = await this.manifest.enemyIdToEnemyStats(i);
            for(j = 0; j < keys.length; j++){
                expect(txn[keys[j]]).to.equal(expectedVals[i-1][keys[j]])
            }
        }
    });
})