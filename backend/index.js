const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tokenomicsRoutes = require("./routes/tokenomics");
const nftRoute = require(`./routes/nft`)
const insightRoute = require('./routes/insights')
const stakeRoute = require('./routes/staking')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", tokenomicsRoutes);
app.use("/api", stakeRoute);
app.use("/nft", nftRoute);
app.use("/insights", insightRoute);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
