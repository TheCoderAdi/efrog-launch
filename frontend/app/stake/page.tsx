"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useWallet } from "@/context/useWallet";
import { ethers } from "ethers";
import CroakTokenABI from "@/data/CroakToken.json";
import StakingABI from "@/data/CroakStaking.json";

const CROAK_TOKEN = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const STAKING_CONTRACT = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const Staking = () => {
  const { account } = useWallet();
  const [balance, setBalance] = useState("0");
  const [reward, setReward] = useState("0");
  const [stakeAmount, setStakeAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUnstake, setLoadingUnstake] = useState(false);
  const [airdropClaimed, setAirdropClaimed] = useState(false);

  useEffect(() => {
    if (account) {
      fetchBalance(account);
      fetchReward(account);
    }
  }, [account]);

  const fetchBalance = async (address: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/balance/${address}`
      );
      const formattedBalance = parseFloat(response.data.balance).toFixed(4);
      setBalance(formattedBalance === "0.0000" ? "0" : formattedBalance);

      const stakeResponse = await axios.get(
        `http://localhost:5000/api/stake/${address}`
      );
      const stakedAmount = parseFloat(stakeResponse.data.amount);

      if (formattedBalance === "0.0000" && stakedAmount === 0) {
        claimAirdrop(address);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Failed to fetch balance");
    }
  };

  const fetchReward = async (address: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/reward/${address}`
      );
      const formattedReward = parseFloat(response.data.reward).toFixed(4);
      setReward(formattedReward === "0.0000" ? "0" : formattedReward);
    } catch (error) {
      console.error("Error fetching reward:", error);
      toast.error("Failed to fetch reward");
    }
  };

  const claimAirdrop = async (address: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/airdrop", {
        address,
      });

      if (response.data.message) {
        toast.success("🎉 Airdrop received! 100 CROAK added!");
        setAirdropClaimed(true);
        fetchBalance(account);
      }
    } catch (error) {
      console.error("Airdrop failed", error);
      toast.error("Airdrop failed");
    }
  };

  const handleStake = async () => {
    if (
      !stakeAmount ||
      isNaN(Number(stakeAmount)) ||
      parseFloat(stakeAmount) <= 0
    ) {
      toast.error("Invalid stake amount");
      return;
    }

    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const croakToken = new ethers.Contract(
        CROAK_TOKEN,
        CroakTokenABI.abi,
        signer
      );
      const stakingContract = new ethers.Contract(
        STAKING_CONTRACT,
        StakingABI.abi,
        signer
      );

      const amountInWei = ethers.parseUnits(stakeAmount, 18);

      const approveTx = await croakToken.approve(STAKING_CONTRACT, amountInWei);
      await approveTx.wait();
      toast.success("Approval successful!");

      const stakeTx = await stakingContract.stake(amountInWei);
      await stakeTx.wait();
      toast.success(`Staked ${stakeAmount} CROAK!`);

      fetchBalance(account);
      fetchReward(account);
      setStakeAmount("");
    } catch (error) {
      console.error("Staking failed", error);
      toast.error("Failed to stake");
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    setLoadingUnstake(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const stakingContract = new ethers.Contract(
        STAKING_CONTRACT,
        StakingABI.abi,
        signer
      );

      const tx = await stakingContract.unstake();
      await tx.wait();
      toast.success("Unstaked successfully!");

      fetchBalance(account);
      fetchReward(account);
    } catch (error) {
      console.error("Unstaking failed", error);
      toast.error("Failed to unstake");
    } finally {
      setLoadingUnstake(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-[#f0fff4] text-green-900 p-12">
        <div className="text-center mb-12">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            🐸 CROAK Staking
          </motion.h1>
        </div>
        <div className="text-center">
          <p className="text-2xl">Connect your wallet to stake CROAK</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0fff4] text-green-900 p-12">
      <div className="text-center mb-12">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          🐸 CROAK Staking
        </motion.h1>
      </div>

      {!airdropClaimed && balance === "0" ? (
        <div className="text-center bg-yellow-100 p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold">
            🎉 Welcome! You have received **100 CROAK** as an airdrop.
          </p>
          <p className="text-lg">Refresh to see your updated balance.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">🔥 Stake CROAK</h2>
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Amount to Stake"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-500"
            />
            <motion.button
              onClick={handleStake}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg cursor-pointer"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
            >
              {loading ? "Staking..." : "✅ Stake"}
            </motion.button>
          </div>

          <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">💰 Unstake CROAK</h2>
            <p className="text-xl mb-4">
              🔥 Staked: <strong>{balance} CROAK</strong>
            </p>
            <p className="text-xl mb-4">
              💰 Reward: <strong>{reward} CROAK</strong>
            </p>
            <motion.button
              onClick={handleUnstake}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg cursor-pointer"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
            >
              {loadingUnstake ? "Unstaking..." : "🚀 Unstake"}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staking;
