"use client";

import { useWallet } from "@/context/useWallet";
import Link from "next/link";

const Navbar = () => {
  const { account, connectWallet } = useWallet();

  return (
    <nav className="bg-green-700 text-white py-4 px-3 flex justify-center items-center gap-12 shadow-lg border-b-1">
      <div className="flex items-center gap-10 justify-center">
        <Link href={"/"} className="text-2xl font-bold">
          🐸 $CROAK
        </Link>
        <Link href="/insights" className="text-xl">
          Insights
        </Link>
        <Link href="/stake" className="text-xl">
          Staking
        </Link>
        <Link href="/mint" className="text-xl">
          NFT Minting
        </Link>
        <Link href="/tokenomics" className="text-xl">
          Tokenomics
        </Link>
        <Link href="/leaderboard" className="text-xl">
          Leaderboard
        </Link>
        <button
          onClick={connectWallet}
          className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg cursor-pointer text-green-950 font-bold"
        >
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
