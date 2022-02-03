import Web3 from 'web3';

import {
  address as invasionAddress,
  abi as invasionABI,
} from 'contracts/CreepzInvasionGrounds/CreepzInvasionGrounds';
import {
  abi as loomiABI,
  address as loomiAddress,
} from 'contracts/Loomi/Loomi';
import {
  abi as lordsABI,
  address as lordsAddress,
} from 'contracts/LordsCo/LordsCo';

export type WalletStats = {
  userReward: number;
  userBalance: number;
  userSpent: number;
  userYield: number;
  vaultAccumulation: number;
  vaultPriceChange: number;
  vaultReward: number;
};

const web3 = new Web3(process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT);
const loomiContract = new web3.eth.Contract(loomiABI, loomiAddress);
const stakingContract = new web3.eth.Contract(invasionABI, invasionAddress);
const lordsContract = new web3.eth.Contract(lordsABI, lordsAddress);

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
  const rawUserVaultAccumulation = await lordsContract.methods
    .getAccumulatedAmount(address)
    .call();
  const rawUserVaultPriceChange = await lordsContract.methods
    .getPriceChange(address)
    .call();

  const rawAccumulation = +Number(
    web3.utils.fromWei(rawUserVaultAccumulation)
  ).toFixed(0);
  const rawPriceChange = Number(rawUserVaultPriceChange);
  return {
    userReward: +Number(web3.utils.fromWei(rawUserReward)).toFixed(0),
    userSpent: +Number(web3.utils.fromWei(rawUserSpent)).toFixed(0),
    userYield: +Number(web3.utils.fromWei(rawUserYield)).toFixed(0),
    userBalance: +Number(web3.utils.fromWei(rawUserBalance)).toFixed(0),
    vaultAccumulation: +Number(rawAccumulation).toFixed(0),
    vaultPriceChange:
      rawPriceChange === 0
        ? 0
        : +Number((rawPriceChange / 10000 - 1) * 100).toFixed(2),
    vaultReward: +Number(+rawAccumulation * (rawPriceChange / 10000)).toFixed(
      2
    ),
  };
};

export default getWalletStats;
