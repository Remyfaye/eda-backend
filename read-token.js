import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

async function main() {
  // Connect to BSC (or whatever RPC you’re using)
  const provider = new ethers.JsonRpcProvider(process.env.BSC_RPC_URL);

  // Your deployed token address (BEP20 contract)
  const tokenAddress = process.env.TOKEN_ADDRESS;

  // Minimal ERC20 ABI to read name, symbol, decimals, balance
  const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ];

  // Create contract instance
  const token = new ethers.Contract(tokenAddress, abi, provider);

  // Query token info
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const supply = await token.totalSupply();

  console.log("Token Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Total Supply:", ethers.formatUnits(supply, decimals));

  // Optional: read balance of an address
  const balance = await token.balanceOf(process.env.WALLET_ADDRESS);
  console.log("Wallet Balance:", ethers.formatUnits(balance, decimals));
}

main().catch(console.error);
