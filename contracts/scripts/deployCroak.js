const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);

    const CroakToken = await hre.ethers.getContractFactory("CroakToken");
    const croakToken = await CroakToken.deploy();
    await croakToken.waitForDeployment();

    console.log("CroakToken deployed to:", await croakToken.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
