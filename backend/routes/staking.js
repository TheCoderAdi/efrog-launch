const express = require("express");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const Croack = require("../../contracts/artifacts/contracts/CroakToken.sol/CroakToken.json");
const Staking = require("../../contracts/artifacts/contracts/CroakStaking.sol/CroakStaking.json");

dotenv.config();
const router = express.Router();

const CROAK_TOKEN = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const STAKING_CONTRACT = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

const croakToken = new ethers.Contract(CROAK_TOKEN, Croack.abi, wallet);
const stakingContract = new ethers.Contract(STAKING_CONTRACT, Staking.abi, wallet);

router.get("/stake/:address", async (req, res) => {
    try {
        const { address } = req.params;
        const stake = await stakingContract.getStake(address);
        if (stake[0] == 0) {
            return res.json({ amount: "0", timestamp: "0" });
        }
        res.json({ amount: ethers.formatUnits(stake[0], 18).toString(), timestamp: stake[1].toString() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch stake" });
    }
});

router.get("/reward/:address", async (req, res) => {
    try {
        const { address } = req.params;
        if (!ethers.isAddress(address)) {
            return res.status(400).json({ error: "Invalid Ethereum address" });
        }

        const reward = await stakingContract.getReward(address);
        if (reward === "0x" || !reward) {
            return res.json({ reward: "0.00", message: "No rewards available or invalid address" });
        }

        res.json({ reward: ethers.formatUnits(reward, 18) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch reward" });
    }
});

router.get("/leaderboard", async (req, res) => {
    try {
        const stakers = await stakingContract.getTopStakers();
        res.json({ stakers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});

router.get("/balance/:address", async (req, res) => {
    const { address } = req.params;

    try {
        const balance = await croakToken.balanceOf(address);
        const formattedBalance = ethers.formatUnits(balance, 18);
        res.json({ balance: formattedBalance.toString() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch balance" });
    }
});

router.post("/airdrop", async (req, res) => {
    try {
        const { address } = req.body;

        if (!address || !ethers.isAddress(address)) {
            return res.status(400).json({ error: "Invalid Ethereum address" });
        }

        const amountInWei = ethers.parseUnits("100", 18);

        const tx = await croakToken.connect(wallet).transfer(address, amountInWei);
        await tx.wait();

        res.json({ message: "Airdrop successful!", amount: "100 CROAK" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Airdrop failed" });
    }
});

module.exports = router;