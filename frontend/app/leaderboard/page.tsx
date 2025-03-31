"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

interface Staker {
  staker: string;
  amount: string;
  reward: string;
  timestamp: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<Staker[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/api/leaderboard");
      setLeaderboard(response.data.stakers);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.error("Failed to fetch leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0fff4] text-green-900 p-12">
      <div className="text-center mb-12">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          🏆 CROAK Staking Leaderboard
        </motion.h1>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {leaderboard?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
              {leaderboard.map((staker, index) => (
                <motion.div
                  key={index}
                  className="bg-white text-gray-900 p-6 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.03 }}
                >
                  <h2 className="text-2xl font-bold mb-2">#{index + 1} 🐸</h2>
                  <p className="text-md">
                    <strong>Address:</strong> {staker}
                  </p>
                  <p className="text-lg">
                    🔥 Staked: <strong>{staker.amount} CROAK</strong>
                  </p>
                  <p className="text-lg">
                    💰 Reward: <strong>{staker.reward} CROAK</strong>
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center w-full">
              <p className="text-3xl font-bold text-center">
                No stakers yet! 🚫
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
