const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying staking contract with account:", deployer.address);

    const CroakStaking = await hre.ethers.getContractFactory("CroakStaking");

    const croakTokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

    const croakStaking = await CroakStaking.deploy(croakTokenAddress);
    await croakStaking.waitForDeployment();

    console.log("CroakStaking deployed to:", await croakStaking.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
