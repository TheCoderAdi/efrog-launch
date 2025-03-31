const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying staking contract with account:", deployer.address);

    const CroakStaking = await hre.ethers.getContractFactory("CroakStaking");

    const croakTokenAddress = "0x117981C7fEAaEaA9a24261f57DC76D1aEa3C05A3";

    const croakStaking = await CroakStaking.deploy(croakTokenAddress);
    await croakStaking.waitForDeployment();

    console.log("CroakStaking deployed to:", await croakStaking.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
