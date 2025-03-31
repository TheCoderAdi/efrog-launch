const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/generate-tokenomics", async (req, res) => {
    const { theme } = req.body;

    if (!theme) {
        return res.status(400).json({ error: "Theme is required" });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
            You are a meme tokenomics generator.
            Generate ERC-20 tokenomics for the theme: "${theme}".
            Include:
            - Token Name
            - Symbol
            - Max Supply
            - Initial Supply
            - Tax Fee (0-5%)
            - Custom Mechanic (reflections, buyback, burns, etc.).
          `
                }
            ],
            model: "llama3-70b-8192",
            max_tokens: 500
        });

        const tokenomics = chatCompletion.choices[0]?.message?.content.trim();

        const formattedResponse = formatTokenomics(tokenomics);

        if (tokenomics) {
            res.json({ tokenomics, formattedResponse });
        } else {
            res.status(500).json({ error: "No tokenomics generated" });
        }

    } catch (error) {
        console.error("Groq API Error:", error);

        if (error.response) {
            res.status(error.response.status).json({
                error: "Groq API returned an error",
                details: error.response.data
            });
        } else if (error.code === "ECONNABORTED") {
            res.status(500).json({ error: "Request timed out" });
        } else {
            res.status(500).json({ error: "Failed to generate tokenomics" });
        }
    }
});

function formatTokenomics(rawResponse) {
    const lines = rawResponse.split("\n").filter(line => line.trim());

    const tokenomics = {
        name: "",
        symbol: "",
        maxSupply: "",
        initialSupply: "",
        taxFee: "",
        mechanics: []
    };

    let currentSection = "";

    lines.forEach((line) => {
        if (line.includes("Token Name:")) {
            tokenomics.name = line.split(":")[1].trim();
        } else if (line.includes("Symbol:")) {
            tokenomics.symbol = line.split(":")[1].trim();
        } else if (line.includes("Max Supply:")) {
            tokenomics.maxSupply = line.split(":")[1].trim();
        } else if (line.includes("Initial Supply:")) {
            tokenomics.initialSupply = line.split(":")[1].trim();
        } else if (line.includes("Tax Fee:")) {
            tokenomics.taxFee = line.split(":")[1].trim();
        } else if (line.includes("Custom Mechanic")) {
            currentSection = "mechanics";
        } else if (currentSection === "mechanics") {
            tokenomics.mechanics.push(line.trim());
        }
    });

    return tokenomics;
}

module.exports = router;
