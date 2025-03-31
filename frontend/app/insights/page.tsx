"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface TradingTransaction {
  token: string;
  volume: number;
  trader: string;
  gasUsed: number;
  gasPrice: number;
  profit: number;
}

interface InsightItem {
  [key: string]: string[];
}

interface PredictionItem {
  token?: string;
  price_change?: string;
  profit?: string;
}

const TradingInsights = () => {
  const [loading, setLoading] = useState(false);
  const [tradingData, setTradingData] = useState<TradingTransaction[]>([]);
  const [insights, setInsights] = useState<{
    insights: InsightItem[];
    predictions: PredictionItem[];
  } | null>(null);

  const fetchInsights = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/insights/get-insights"
      );
      setTradingData(response.data.tradingData);
      setInsights(parseInsights(response.data.insights));
      toast.success("Fetched trading insights!");
    } catch (error) {
      console.error("Error fetching insights:", error);
      toast.error("Failed to fetch insights");
    } finally {
      setLoading(false);
    }
  };

  const parseInsights = (rawText: string) => {
    try {
      const jsonMatch = rawText.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : rawText;
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse insights JSON:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fff4] text-green-900 p-12">
      <div className="text-center mb-12">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          📊 Real-time Trading Insights
        </motion.h1>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={fetchInsights}
          className="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Insights"}
        </button>
      </div>

      {tradingData.length > 0 && (
        <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">🛒 Recent Trades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradingData.map((trade, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-sm font-bold">🔹 Token: {trade.token}</p>
                <p>💰 Volume: {trade.volume} ETH</p>
                <p>👤 Trader: {trade.trader}</p>
                <p>⛽ Gas Used: {trade.gasUsed}</p>
                <p>⛽ Gas Price: {trade.gasPrice} Gwei</p>
                <p>💵 Profit: ${trade.profit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {insights && (
        <div className="bg-green-100 text-green-900 p-8 rounded-lg shadow-lg mt-8">
          <h2 className="text-3xl font-bold mb-4">🤖 AI-Powered Insights</h2>

          <ul className="list-disc pl-6">
            {insights.insights.map((item: InsightItem, index: number) => {
              const [key, value] = Object.entries(item)[0];
              return (
                <li key={index} className="mb-2">
                  <strong>{key}:</strong> {value.join(", ")}
                </li>
              );
            })}
          </ul>

          <h3 className="text-2xl font-semibold mt-6">🔮 Predictions:</h3>
          <ul className="list-disc pl-6">
            {insights.predictions.map(
              (prediction: PredictionItem, index: number) => (
                <li key={index} className="mb-2">
                  <strong>Token: {prediction.token}</strong> →{" "}
                  {prediction.price_change
                    ? prediction.price_change
                    : prediction.profit}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TradingInsights;
