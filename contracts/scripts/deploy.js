const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address);

    const MemeToken = await hre.ethers.getContractFactory("MemeToken");
    const initialSupply = hre.ethers.parseUnits("1000000", 18);  // 1M tokens
    const maxSupply = hre.ethers.parseUnits("10000000", 18);     // 10M cap
    const taxFee = 200; // 2% fee

    const token = await MemeToken.deploy(
        "Efrog Token",
        "CROAK",
        initialSupply,
        maxSupply,
        taxFee
    );

    await token.waitForDeployment();
    console.log("Token deployed to:", await token.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
