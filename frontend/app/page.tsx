"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-green-600 to-green-900 text-white min-h-screen">
      <section className="flex flex-col items-center justify-center h-screen text-center px-8">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🐸 Welcome to <span className="text-yellow-300">$CROAK</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Trade, Stake, and Mint your way into the future of <b>DeFi & NFTs</b>.
        </motion.p>

        <Link
          href="/stake"
          className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🚀 Start Staking
        </Link>
      </section>

      <section className="py-24 px-8 bg-[#f0fff4] text-green-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">⚡ Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 align-center justify-center">
            <motion.div
              className="flex flex-col justify-around p-8 bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-2xl font-bold">📊 Trading Insights</h3>
              <p className="mt-4">
                View <b>real-time token trades</b> and AI-generated insights
                powered by Alchemy & Groq.
              </p>
              <Link
                href="/insights"
                className="mt-6 inline-block text-green-700 hover:underline"
              >
                ➡️ Learn More
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col justify-around p-8 bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-2xl font-bold">💎 Staking Platform</h3>
              <p className="mt-4">
                Stake <b>$CROAK tokens</b> and earn <b>rewards</b> with flexible
                yields.
              </p>
              <Link
                href="/stake"
                className="mt-6 inline-block text-green-700 hover:underline"
              >
                ➡️ Start Staking
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col justify-around p-8 bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-2xl font-bold">🖼️ NFT Minting</h3>
              <p className="mt-4">
                Mint your own <b>Efroglet NFTs</b> with unique metadata.
              </p>
              <Link
                href="/mint"
                className="mt-6 inline-block text-green-700 hover:underline"
              >
                ➡️ Mint NFT
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col justify-around p-8 bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-2xl font-bold">⚙️ Tokenomics Generator</h3>
              <p className="mt-4">
                Use <b>Groq AI</b> to create ERC-20 tokenomics with{" "}
                <b>custom mechanics</b>.
              </p>
              <Link
                href="/tokenomics"
                className="mt-6 inline-block text-green-700 hover:underline"
              >
                ➡️ Generate Tokenomics
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col justify-around p-8 bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-2xl font-bold">🏅 Leaderboard</h3>
              <p className="mt-4">
                See the <b>top stakers</b> and their rewards on the leaderboard.
              </p>
              <Link
                href="/leaderboard"
                className="mt-6 inline-block text-green-700 hover:underline"
              >
                ➡️ View Leaderboard
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            🔧 How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-green-600 rounded-lg shadow-lg cursor-pointer">
              <h3 className="text-2xl font-bold">1️⃣ Connect Wallet</h3>
              <p className="mt-4">
                Use <b>Metamask</b> to connect your wallet and access all
                <b>$CROAK</b> features.
              </p>
            </div>

            <div className="p-8 bg-green-600 rounded-lg shadow-lg cursor-pointer">
              <h3 className="text-2xl font-bold">2️⃣ Trade, Stake & Mint</h3>
              <p className="mt-4">
                Access <b>trading insights</b>, stake tokens, and mint
                <b>Efroglet NFTs</b> easily.
              </p>
            </div>

            <div className="p-8 bg-green-600 rounded-lg shadow-lg cursor-pointer">
              <h3 className="text-2xl font-bold">3️⃣ Earn & Compete</h3>
              <p className="mt-4">
                Earn staking rewards and climb the <b>leaderboard</b> with high
                scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-[#f0fff4] text-green-900 text-center">
        <h2 className="text-4xl font-bold">🔥 Ready to Dive into $CROAK?</h2>
        <p className="mt-4 text-lg">
          Start staking, minting NFTs, and earning rewards today!
        </p>

        <Link
          href="/stake"
          className="mt-6 inline-block bg-green-700 hover:bg-green-800 text-white py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🐸 Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
