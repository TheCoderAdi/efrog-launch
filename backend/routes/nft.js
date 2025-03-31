const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const EfrogletNFT = require("../../contracts/artifacts/contracts/EfrogletNFT.sol/EfrogletNFT.json");

dotenv.config();

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

const nftAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const nftContract = new ethers.Contract(nftAddress, EfrogletNFT.abi, wallet);

router.post("/mint-nft", async (req, res) => {
    const { recipient, tokenURI } = req.body;

    if (!recipient || !tokenURI) {
        return res.status(400).json({ error: "Recipient and tokenURI are required" });
    }

    try {
        const tx = await nftContract.mintEfroglet(recipient, tokenURI);
        await tx.wait();

        res.json({
            message: "Efroglet NFT minted successfully!",
            recipient,
            tokenURI
        });

    } catch (error) {
        console.error("Error minting NFT:", error);
        res.status(500).json({ error: "Failed to mint NFT" });
    }
});

module.exports = router;
