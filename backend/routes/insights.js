const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const dotenv = require("dotenv");
const { Alchemy, Network } = require("alchemy-sdk");

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const alchemy = new Alchemy({
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
});

const getTradingData = async () => {
    try {
        const latestBlock = await alchemy.core.getBlock("latest");

        const txs = await Promise.all(
            latestBlock.transactions.map(async (txHash) => {
                const tx = await alchemy.core.getTransaction(txHash);

                if (tx && tx.to) {
                    return {
                        token: tx.to,
                        volume: parseFloat(tx.value) / 1e18,
                        trader: tx.from,
                        gasUsed: tx.gasLimit.toString(),
                        gasPrice: (parseFloat(tx.gasPrice) / 1e9).toFixed(2),
                        profit: (Math.random() * 1000).toFixed(2),
                    };
                }
                return null;
            })
        );

        return txs.filter((tx) => tx !== null).slice(0, 5);
    } catch (error) {
        console.error("Error fetching trading data:", error);
        return [];
    }
};

router.get("/get-insights", async (req, res) => {
    try {
        const tradingData = await getTradingData();

        if (tradingData.length === 0) {
            return res.status(500).json({ error: "No trading data available." });
        }

        const content = `
    Real-time trading data:
    ${tradingData
                .map(
                    (d) =>
                        `Token: ${d.token}, Volume: ${d.volume.toFixed(4)} ETH, Trader: ${d.trader
                        }, Gas Used: ${d.gasUsed}, Gas Price: ${d.gasPrice} Gwei, Profit: $${d.profit}`
                )
                .join("\n")}
    
    Generate insights and predictions based on the real-time token performance and 
Generate insights and predictions in JSON format and dont give any extra text
        {
            "insights": [
                { "top performing token": [] },
                { "top performing trader": [] },
                { "most active trader": [] },
                { "Token Volume Insights": [] },
                { "Gas Usage Insights": [] }
            ],
            "predictions": []
        }
    `;

        const aiResponse = await groq.chat.completions.create({
            messages: [{ role: "user", content }],
            model: "llama3-70b-8192",
        });

        const insights = aiResponse.choices[0]?.message?.content || "No insights available.";

        res.json({ tradingData, insights });

    } catch (error) {
        console.error("Error generating trading insights:", error);
        res.status(500).json({ error: "Failed to generate insights" });
    }
});

module.exports = router;
