"use client";

import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

interface WalletContextType {
  account: string;
  connectWallet: () => void;
}

export const WalletContext = createContext<WalletContextType | null>(null);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [account, setAccount] = useState<string>("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Metamask not installed");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      toast.success(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
    } catch (error) {
      console.error("Wallet connection failed", error);
      toast.error("Failed to connect wallet");
    }
  };

  useEffect(() => {
    if (account && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
        toast.success(
          `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`
        );
      });
    }
  }, [account]);

  return (
    <WalletContext.Provider value={{ account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    toast.error("useWallet must be used within a WalletProvider");
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
