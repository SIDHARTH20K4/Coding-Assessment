// Load environment variables (RPC_URL, PORT) from .env
require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");

const app = express();
const PORT = process.env.PORT || 3000;

// USDC on Ethereum mainnet (read-only calls, no wallet or gas needed)
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

// Minimal human-readable ABI: only the read functions we need
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
];

// Connect to Ethereum via the RPC URL configured in .env
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// GET /api/SidharthApiTest
// Reads public data from the USDC contract and returns it as JSON
app.get("/api/SidharthApiTest", async (req, res) => {
  try {
    const contract = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);

    // Run all read calls in parallel for speed
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply(),
    ]);

    res.json({
      success: true,
      network: "Ethereum Mainnet",
      contract: USDC_ADDRESS,
      data: {
        name,
        symbol,
        decimals: Number(decimals), // uint8 comes back as BigInt in ethers v6
        totalSupply: ethers.formatUnits(totalSupply, decimals), // human-readable string
      },
    });
  } catch (error) {
    // Return a clear error instead of crashing the server
    console.error("SidharthApiTest error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch data from the smart contract",
      details: error.shortMessage || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});