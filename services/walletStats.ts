import { formatUnits } from '@ethersproject/units';
import type Web3 from 'web3';

import { abi as armsABI, address as armsAddress } from 'contracts/Arms/Arms';
import {
  address as creepzAddress,
  abi as creepzABI,
} from 'contracts/Creepz/Creepz';
import {
  address as invasionAddress,
  abi as invasionABI,
} from 'contracts/CreepzInvasionGrounds/CreepzInvasionGrounds';
import {
  abi as loomiABI,
  address as loomiAddress,
} from 'contracts/Loomi/Loomi';

// import {
//   abi as vaultABI,
//   address as vaultAddress,
// } from 'contracts/Vaults/Vaults';

export type WalletStats = {
  userReward: number;
  userBalance: number;
  userSpent: number;
  userYield: number;
  stakedCreepz: string[];
  stakedArmouries: string[];
  unstakedArmouries: number;
  totalArmouries: number;
  stakedBlackboxes: string[];
  unstakedCreepz: number;
  totalCreepz: number;
};
export default async function getWalletStats(
  web3: Web3,
  address: string
): Promise<WalletStats> {
  const creepzContract = new web3.eth.Contract(creepzABI, creepzAddress);
  const armsContract = new web3.eth.Contract(armsABI, armsAddress);
  const stakingContract = new web3.eth.Contract(invasionABI, invasionAddress);
  const loomiContract = new web3.eth.Contract(loomiABI, loomiAddress);
  // const shapeshifterContract = new web3.eth.Contract(
  //   shapeshifterABI,
  //   shapeshifterAddress
  // );
  // const vaultContract = new web3.eth.Contract(vaultABI, vaultAddress);
  // Reward
  const rawUserReward = await loomiContract.methods
    .getUserBalance(address)
    .call();
  const rawUserSpent = await loomiContract.methods.spentAmount(address).call();
  const rawUserYield = await stakingContract.methods
    .getStakerYield(address)
    .call();
  // Balance
  const rawUserBalance = await loomiContract.methods.balanceOf(address).call();
  // Staked Creepz, Armouries, Balckboxes
  const rawStakedTokens = await stakingContract.methods
    .getStakerTokens(address)
    .call();
  // Unstaked Creepz
  const rawUnstakedCreepz = await creepzContract.methods
    .balanceOf(address)
    .call();
  // Unstaked Armouries
  const rawUnstakedArmouries = await armsContract.methods
    .balanceOf(address)
    .call();

  return {
    userReward: +Number(web3.utils.fromWei(rawUserReward)).toFixed(0),
    userSpent: +Number(web3.utils.fromWei(rawUserSpent)).toFixed(0),
    userYield: +Number(web3.utils.fromWei(rawUserYield)).toFixed(0),
    userBalance: +Number(web3.utils.fromWei(rawUserBalance)).toFixed(0),
    stakedCreepz: rawStakedTokens[0].map((t: string) => formatUnits(t, 0)),
    stakedArmouries: rawStakedTokens[1].map((t: string) => formatUnits(t, 0)),
    stakedBlackboxes: rawStakedTokens[2].map((t: string) => formatUnits(t, 0)),
    unstakedCreepz: +rawUnstakedCreepz,
    totalCreepz: +rawStakedTokens[0].length + parseInt(rawUnstakedCreepz, 10),
    unstakedArmouries: +rawUnstakedArmouries,
    totalArmouries:
      rawStakedTokens[1].length + parseInt(rawUnstakedArmouries, 10),
  };
}
