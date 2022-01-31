import Web3 from 'web3';

import {
  address as invasionAddress,
  abi as invasionABI,
} from 'contracts/CreepzInvasionGrounds/CreepzInvasionGrounds';
import {
  abi as loomiABI,
  address as loomiAddress,
} from 'contracts/Loomi/Loomi';

export type WalletStats = {
  userReward: number;
  userBalance: number;
  userSpent: number;
  userYield: number;
};

const web3 = new Web3(process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT);
const loomiContract = new web3.eth.Contract(loomiABI, loomiAddress);
const stakingContract = new web3.eth.Contract(invasionABI, invasionAddress);

const getWalletStats = async (address: string): Promise<WalletStats> => {
  const rawUserReward = await loomiContract.methods
    .getUserBalance(address)
    .call();
  const rawUserSpent = await loomiContract.methods.spentAmount(address).call();
  const rawUserYield = await stakingContract.methods
    .getStakerYield(address)
    .call();
  // Balance
  const rawUserBalance = await loomiContract.methods.balanceOf(address).call();
  return {
    userReward: +Number(web3.utils.fromWei(rawUserReward)).toFixed(0),
    userSpent: +Number(web3.utils.fromWei(rawUserSpent)).toFixed(0),
    userYield: +Number(web3.utils.fromWei(rawUserYield)).toFixed(0),
    userBalance: +Number(web3.utils.fromWei(rawUserBalance)).toFixed(0),
  };
};

export default getWalletStats;
