const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying NFT contract with account:", deployer.address);

    const EfrogletNFT = await hre.ethers.getContractFactory("EfrogletNFT");
    const nft = await EfrogletNFT.deploy();

    await nft.waitForDeployment();
    console.log("Efroglet NFT deployed to:", await nft.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
