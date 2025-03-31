"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const MintNFT = () => {
  const [recipient, setRecipient] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const mintNFT = async () => {
    if (!recipient || !tokenURI) {
      toast.error("Recipient and TokenURI are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/nft/mint-nft", {
        recipient,
        tokenURI,
      });

      setTxHash(response.data.txHash);
      toast.success(`NFT Minted Successfully!`);
    } catch (error) {
      console.error("Minting failed:", error);
      toast.error("Failed to mint NFT");
    } finally {
      setLoading(false);
      setRecipient("");
      setTokenURI("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fff4] text-green-950 p-12">
      <div className="text-center mb-12">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          🎨 Mint Your Froglet NFT
        </motion.h1>
      </div>

      <div className="bg-white text-gray-900 p-10 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🐸 Mint New NFT</h2>

        <label className="block text-lg mb-2">Recipient Address</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter recipient address"
          className="w-full p-4 border rounded-lg mb-4"
        />

        <label className="block text-lg mb-2">Token URI</label>
        <input
          type="text"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          placeholder="Enter Token URI"
          className="w-full p-4 border rounded-lg mb-4"
        />

        <motion.button
          onClick={mintNFT}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg cursor-pointer"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
        >
          {loading ? "Minting..." : "🔥 Mint NFT"}
        </motion.button>

        {txHash && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <p className="text-green-700 font-bold">✅ NFT Minted!</p>
            <p>
              Tx Hash:{" "}
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {txHash}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintNFT;
