# Efrog Launch

Efrog Launch is an **AI-powered meme token launchpad** that allows users to easily create and deploy tokens, stake $CROAK for rewards, and earn exclusive Efroglet NFTs. This platform integrates AI-driven tokenomics, staking rewards, NFT minting, and a governance system powered by $CROAK.

### Deployed Contracts

CROAKTOKEN : 0x117981C7fEAaEaA9a24261f57DC76D1aEa3C05A3

## ⚙️ **Tech Stack**

### 💻 **Frontend**

- **Next.js:** For the user interface.
- **Tailwind CSS:** For sleek, responsive styling.
- **Framer Motion:** For smooth animations.
- **Axios:** For API calls.

### ⚙️ **Backend**

- **Express.js:** REST API for interacting with the blockchain.
- **Ethers.js:** For blockchain interactions and contract calls.
- **Groq API:** For generating meme tokenomics.
- **Solidity:** Smart contracts for **staking and rewards**.

## 🚀 Features

### 🐸 AI-Powered Token Launch

- Instantly generate and deploy meme tokens.
- AI-driven optimized tokenomics.
- Customizable supply, tax fees, and burn mechanisms.

### 💰 $CROAK Staking

- Stake $CROAK to earn passive rewards.
- Unlock exclusive Efroglet NFTs.
- Leaderboard for top stakers.

### 🎨 Efroglet NFT Minting

- Earn rare Efroglet NFTs through staking.
- On-chain NFT metadata and unique designs.

### 📊 AI Trading Insights

- Real-time analytics for meme tokens.
- AI-powered trading recommendations.

### 🏆 Community & Governance

- $CROAK holders participate in governance.
- Engage in leaderboards and airdrops.

---

## 📜 Smart Contracts

### **CroakToken.sol**

- ERC20 token contract for $CROAK.
- Max supply: 100,000,000.
- Minting and burning functionality.

### **CroakStaking.sol**

- Stake $CROAK to earn rewards.
- Unstake anytime with calculated rewards.
- Top stakers leaderboard.

### **EfrogletNFT.sol**

- ERC721 NFT contract for Efroglet collectibles.
- Max supply: 10,000.
- Rewards tied to staking activity.

### **MemeToken.sol**

- Customizable meme token smart contract.
- Built-in tax fee mechanism.
- Owner-controlled minting and supply limits.

---

## 🛠️ Installation & Setup

### **ENV Setup**

```bash
GROQ_API_KEY=groq-api-key
PORT=5000
ALCHEMY_API_KEY=alchemy-api-key
```

### **1️⃣ Clone the Repository**

```bash
 git clone https://github.com/thecoderadi/efrog-launch.git
 cd efrog-launch
```

### **2️⃣ Install Dependencies**

```bash
cd frontend && npm install
cd backend && npm install
```

### **3️⃣ Deploy Smart Contracts**

```bash
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
npx hardhat run scripts/deploy-nft.js --network localhost
npx hardhat run scripts/deployCroak.js --network localhost
npx hardhat run scripts/deployStaking.js --network localhost
```

### **4️⃣ Run the Frontend**

```bash
npm run dev
```

### **5️⃣ Run the Frontend**

```bash
npm run dev
```

---

## 📜 License

This project is licensed under the **MIT License**.
