import { ethers } from "ethers";
import ERC20_ABI from "../abis/erc20.json";

const provider = new ethers.JsonRpcProvider(process.env.BSC_RPC);
const treasuryPrivateKey = process.env.TREASURY_PRIVATEKEY;
const treasurySigner = new ethers.Wallet(treasuryPrivateKey);
const EDA_ADDRESS = process.env.EDA_TOKEN_ADDRESS;

export async function sendToken(to, amountReadable) {
  const token = new ethers.Contract(EDA_ADDRESS, ERC20_ABI, treasurySigner);
  const decimals = await token.decimals();
  const amount = ethers.parseUnits(amountReadable, decimals);
  const tx = await token.transfer(to, amount);
  const receipt = await tx.wait();
  return receipt;
}
