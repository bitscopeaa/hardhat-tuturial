const {expect} = require("chai");
const {loadFixture} =  require("@nomicfoundation/hardhat-network-helpers");
const {ethers} = require("hardhat");

async function deployToken(){
    const [owner, address1, address2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const hardhatToken = await Token.deploy();
    return {hardhatToken,owner, address1, address2};
 }

describe("Token", function(){

    it("Deployment", async function () {
        const  {hardhatToken, owner} = await loadFixture(deployToken);
        expect(await hardhatToken.owner()).to.equal(await owner.getAddress());
        expect(await hardhatToken.balanceOf(owner.getAddress())).to.equal(await hardhatToken.totalSupply()); 
    });

});

describe("Transaction", function(){

    it("Should Succ", async function(){
        const {hardhatToken, owner, address1,address2} = await loadFixture(deployToken);
    

        await expect(hardhatToken.transfer(address1.getAddress(),50)).to.changeTokenBalances(hardhatToken, [owner,address1],[-50, 50]);
        await expect(
            hardhatToken.connect(address1).transfer(address2.getAddress(),50)
        ).to.changeTokenBalances(hardhatToken,[address1,address2],[-50,50])
        .to.emit(hardhatToken,"Transfer")
        .withArgs(address1.address, address2.address,50);
       
    });
    it("Should fail if balance not enough", async function(){
        const {hardhatToken,owner,address1} = await loadFixture(deployToken);
        await expect(
            hardhatToken.connect(address1).transfer(owner.address, 1000)
        ).revertedWith("balance not enough");
    });
});
