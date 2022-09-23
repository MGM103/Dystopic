const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params) {
    const newContract = await ethers.getContractFactory(name);
    return await newContract.deploy(...params).then(c => c.deployed());
}

describe("Weapons", () => {
    beforeEach(async () => {
        this.wpnContract = await deploy("Weapons");
        this.accounts = await ethers.getSigners();
    });

    it("Rejects minting invalid wpn variants", async () => {
        const invVariant1 = 0, invVariant2 = 4;

        await expect(
            this.wpnContract.createWeapon(invVariant1)
        ).to.be.revertedWith("Invalid Weapon Variant");

        await expect(
            this.wpnContract.createWeapon(invVariant2)
        ).to.be.revertedWith("Invalid Weapon Variant");
    })

    it("Creates all weapons correctly", async () => {
        let wpnVariant, wpnTxn;
        let owner = this.accounts[0];
        let expectedOwnedTokens = [1, 2, 3];
        
        const totalVariants = await this.wpnContract.totalVariants();

        for(i = 0; i < totalVariants.toNumber(); i++){
            wpnVariant = i+1 
            wpnTxn = await this.wpnContract.createWeapon(wpnVariant);
            expect(wpnTxn).to.emit(this.wpnContract, "weaponMinted");

            wpnTxn = await this.wpnContract.ownerToTokenIds(owner.address, i);
            expect(wpnTxn).to.equal(expectedOwnedTokens[i]);
        }
    });

    it("Creates the correct tokenURI", async () => {
        let txn;
        const totalVariants = await this.wpnContract.totalVariants();
        const wpnURIs = [
            "data:application/json;base64,eyJuYW1lIjogIkJhdG9uIiwgImRlc2NyaXB0aW9uIjogIlN0YW5kYXJkIGlzc3VlIHBvbGljZSBvZmZpY2VyIHByb3RlY3Rpb24gYmF0b24iLCAiaW1hZ2UiOiAiaHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vdmVjdG9ycy92ZWN0b3Itc2tldGNoLXRlbGVzY29waWMtYmF0b24tdmVjdG9yLWlkNDkzMDI0NDQyP2s9NiZtPTQ5MzAyNDQ0MiZzPTYxMng2MTImdz0wJmg9bWRiYUxtblNvcTRmSnRIYWd2TDN1dnRIa2lXX1BqMWE4bDl0X1BNTzFmWT0iLCAiYXR0cmlidXRlcyI6IFt7ICJ0cmFpdF90eXBlIjogIkRhbWFnZSBUeXBlIiwgInZhbHVlIjogIlNsYXNoaW5nIn0sIHsgInRyYWl0X3R5cGUiOiAiTGltaXRlZCBTdXBwbHkiLCAidmFsdWUiOiAiZmFsc2UifSwgeyJ0cmFpdF90eXBlIjogIkNvc3QiLCAidmFsdWUiOiIxMCJ9LCB7InRyYWl0X3R5cGUiOiAiV2VpZ2h0IiwgInZhbHVlIjoiMiJ9LCB7InRyYWl0X3R5cGUiOiAiTWluIERhbWFnZSIsICJ2YWx1ZSI6IjEifSwgeyJ0cmFpdF90eXBlIjogIk1heCBEYW1hZ2UiLCAidmFsdWUiOiI1In0sIHsidHJhaXRfdHlwZSI6ICJDcml0IENoYW5jZSIsICJ2YWx1ZSI6IjEifV19",
            "data:application/json;base64,eyJuYW1lIjogIk1ldGFsIFJvZCIsICJkZXNjcmlwdGlvbiI6ICJUaGF0IGNvbnN0dWN0aW9uIHNpdGUgZG9lc24ndCBuZWVkIHRoaXMiLCAiaW1hZ2UiOiAiaHR0cHM6Ly9jbGlwZ3JvdW5kLmNvbS9pbWFnZXMvbWV0YWwtcm9kLWNsaXBhcnQtNi5qcGciLCAiYXR0cmlidXRlcyI6IFt7ICJ0cmFpdF90eXBlIjogIkRhbWFnZSBUeXBlIiwgInZhbHVlIjogIkJsdWRnZW9uaW5nIn0sIHsgInRyYWl0X3R5cGUiOiAiTGltaXRlZCBTdXBwbHkiLCAidmFsdWUiOiAiZmFsc2UifSwgeyJ0cmFpdF90eXBlIjogIkNvc3QiLCAidmFsdWUiOiI1In0sIHsidHJhaXRfdHlwZSI6ICJXZWlnaHQiLCAidmFsdWUiOiIyIn0sIHsidHJhaXRfdHlwZSI6ICJNaW4gRGFtYWdlIiwgInZhbHVlIjoiMSJ9LCB7InRyYWl0X3R5cGUiOiAiTWF4IERhbWFnZSIsICJ2YWx1ZSI6IjUifSwgeyJ0cmFpdF90eXBlIjogIkNyaXQgQ2hhbmNlIiwgInZhbHVlIjoiMSJ9XX0=",
            "data:application/json;base64,eyJuYW1lIjogIlNoaXYiLCAiZGVzY3JpcHRpb24iOiAiU3RpY2sgdGhlbSB3aXRoIHRoZSBwb2ludHkgZW5kIiwgImltYWdlIjogImh0dHBzOi8vc3RhdGljLndpa2lhLm5vY29va2llLm5ldC9za3lyaW1fZ2FtZXBlZGlhL2ltYWdlcy9iL2I2L1NoaXYucG5nL3JldmlzaW9uL2xhdGVzdD9jYj0yMDEyMDExNDE1NTkzMSIsICJhdHRyaWJ1dGVzIjogW3sgInRyYWl0X3R5cGUiOiAiRGFtYWdlIFR5cGUiLCAidmFsdWUiOiAiUGllcmNpbmcifSwgeyAidHJhaXRfdHlwZSI6ICJMaW1pdGVkIFN1cHBseSIsICJ2YWx1ZSI6ICJmYWxzZSJ9LCB7InRyYWl0X3R5cGUiOiAiQ29zdCIsICJ2YWx1ZSI6IjgifSwgeyJ0cmFpdF90eXBlIjogIldlaWdodCIsICJ2YWx1ZSI6IjEifSwgeyJ0cmFpdF90eXBlIjogIk1pbiBEYW1hZ2UiLCAidmFsdWUiOiIzIn0sIHsidHJhaXRfdHlwZSI6ICJNYXggRGFtYWdlIiwgInZhbHVlIjoiOCJ9LCB7InRyYWl0X3R5cGUiOiAiQ3JpdCBDaGFuY2UiLCAidmFsdWUiOiIyIn1dfQ=="
        ];

        for(i = 0; i < totalVariants.toNumber(); i++){
            txn = await this.wpnContract.createWeapon(i+1);
            txn = await this.wpnContract.tokenURI(i+1);
            expect(txn).to.equal(wpnURIs[i]);
        }
    });
});