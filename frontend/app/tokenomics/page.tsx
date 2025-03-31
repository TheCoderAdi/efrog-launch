"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface TokenomicsResponse {
  name: string;
  symbol: string;
  maxSupply: string;
  initialSupply: string;
  taxFee: string;
  mechanics: string[];
}

const Tokenomics = () => {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenomics, setTokenomics] = useState<TokenomicsResponse | null>(null);

  const generateTokenomics = async () => {
    if (!theme) {
      toast.error("Please enter a theme!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate-tokenomics",
        { theme }
      );
      // replace all ** with empty string using replace and regex
      response.data.formattedResponse.mechanics =
        response.data.formattedResponse.mechanics.map((mech: string) =>
          mech.replace(/\*\*/g, "")
        );
      setTokenomics(response.data.formattedResponse);
      toast.success("Tokenomics generated successfully!");
    } catch (error) {
      console.error("Error generating tokenomics:", error);
      toast.error("Failed to generate tokenomics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fff4] text-green-900 p-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold">🚀 Generate Your Tokenomics</h1>
        <p className="text-lg mt-4">
          Enter a theme and let AI generate detailed tokenomics.
        </p>
      </motion.div>

      <div className="bg-white text-gray-900 p-10 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
        <label className="block text-lg font-semibold mb-2">
          Meme Token Theme
        </label>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g., Frog-themed meme coin"
          className="w-full p-4 border rounded-lg mb-4"
        />

        <motion.button
          onClick={generateTokenomics}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg cursor-pointer"
          whileHover={{ scale: 1.03 }}
          disabled={loading}
        >
          {loading ? "Generating..." : "🔥 Generate Tokenomics"}
        </motion.button>
      </div>

      {tokenomics && (
        <div className="mt-12 p-8 bg-gray-100 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            🛠️ Generated Tokenomics
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xl">
                <strong>📛 Name:</strong> {tokenomics.name.replace(/\*\*/g, "")}
              </p>
              <p className="text-xl">
                <strong>💎 Symbol:</strong>{" "}
                {tokenomics.symbol.replace(/\*\*/g, "")}
              </p>
              <p className="text-xl">
                <strong>🔢 Max Supply:</strong>{" "}
                {tokenomics.maxSupply.replace(/\*\*/g, "")}
              </p>
              <p className="text-xl">
                <strong>🚀 Initial Supply:</strong>{" "}
                {tokenomics.initialSupply.replace(/\*\*/g, "")}
              </p>
              <p className="text-xl">
                <strong>📉 Tax Fee:</strong>{" "}
                {tokenomics.taxFee.replace(/\*\*/g, "")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">⚙️ Custom Mechanics:</h3>
              <ul className="list-disc ml-6">
                {tokenomics.mechanics.map((mech, index) => (
                  <li key={index} className="text-lg">
                    {mech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tokenomics;
