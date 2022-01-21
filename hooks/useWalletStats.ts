import { useEffect, useState } from 'react';

import { formatUnits } from '@ethersproject/units';
import useSWR from 'swr';
import Web3 from 'web3';

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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useWalletStats(address?: string) {
  const addressIsValid = address && Web3.utils.isAddress(address);
  const [userReward, setUserReward] = useState<string>('0'); // In-game loomi
  const [userSpent, setUserSpent] = useState<string>('0'); // In-game loomi
  const [userBalance, setUserBalance] = useState<string>('0'); // ERC-20 balance
  const [userYield, setUserYield] = useState<string>('0');
  const [stakedCreepz, setStakedCreepz] = useState<string[]>([]);
  const [stakedArmouries, setStakedArmouries] = useState<string[]>([]);
  const [unstakedArmouries, setUnstakedArmouries] = useState<number>(0);
  const [totalArmouries, setTotalArmouries] = useState<number>(0);
  const [stakedBlackboxes, setStakedBlackboces] = useState<string[]>([]);
  const [unstakedCreepz, setUnstakedCreepz] = useState<number>(0);
  const [totalCreepz, setTotalCreepz] = useState<number>(0);
  const { data } = useSWR('/api/loomiPrice', fetcher);

  useEffect(() => {
    const getWalletStats = async () => {
      const web3 = new Web3(
        window.ethereum || process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT
      );
      const creepzContract = new web3.eth.Contract(creepzABI, creepzAddress);
      const armsContract = new web3.eth.Contract(armsABI, armsAddress);
      const stakingContract = new web3.eth.Contract(
        invasionABI,
        invasionAddress
      );
      const loomiContract = new web3.eth.Contract(loomiABI, loomiAddress);
      // Reward
      const rawUserReward = await loomiContract.methods
        .getUserBalance(address)
        .call();
      setUserReward(Number(web3.utils.fromWei(rawUserReward)).toFixed(0));
      // Spent
      const rawUserSpent = await loomiContract.methods
        .spentAmount(address)
        .call();
      setUserSpent(Number(web3.utils.fromWei(rawUserSpent)).toFixed(0));
      // Yield
      const rawUserYield = await stakingContract.methods
        .getStakerYield(address)
        .call();
      setUserYield(Number(web3.utils.fromWei(rawUserYield)).toFixed(0));
      // Balance
      const rawUserBalance = await loomiContract.methods
        .balanceOf(address)
        .call();
      setUserBalance(Number(web3.utils.fromWei(rawUserBalance)).toFixed(0));
      // Staked Creepz, Armouries, Balckboxes
      const rawStakedTokens = await stakingContract.methods
        .getStakerTokens(address)
        .call();
      setStakedCreepz(rawStakedTokens[0].map((t: string) => formatUnits(t, 0)));
      setStakedArmouries(
        rawStakedTokens[1].map((t: string) => formatUnits(t, 0))
      );
      setStakedBlackboces(
        rawStakedTokens[2].map((t: string) => formatUnits(t, 0))
      );
      // Unstaked Creepz
      const rawUnstakedCreepz = await creepzContract.methods
        .balanceOf(address)
        .call();
      setUnstakedCreepz(rawUnstakedCreepz);
      setTotalCreepz(
        rawStakedTokens[0].length + parseInt(rawUnstakedCreepz, 10)
      );
      // Unstaked Armouries
      const rawUnstakedArmouries = await armsContract.methods
        .balanceOf(address)
        .call();
      setUnstakedArmouries(rawUnstakedArmouries);
      setTotalArmouries(
        rawStakedTokens[1].length + parseInt(rawUnstakedArmouries, 10)
      );
    };
    if (addressIsValid) {
      getWalletStats();
    }
  }, [address, addressIsValid]);

  return {
    userReward,
    userBalance,
    userSpent,
    loomiPrice: data ? data.price : 0,
    userYield,
    stakedCreepz,
    stakedArmouries,
    unstakedArmouries,
    totalArmouries,
    stakedBlackboxes,
    unstakedCreepz,
    totalCreepz,
  };
}

export default useWalletStats;
