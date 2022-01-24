import { useEffect, useMemo, useState } from 'react';

import useSWR from 'swr';
import Web3 from 'web3';

import getWalletStats from 'services/walletStats';

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

function useWalletStats(address?: string) {
  const addressIsValid = address && Web3.utils.isAddress(address);
  const [userReward, setUserReward] = useState<number>(0); // In-game loomi
  const [userSpent, setUserSpent] = useState<number>(0); // In-game loomi
  const [userBalance, setUserBalance] = useState<number>(0); // ERC-20 balance
  const [userYield, setUserYield] = useState<number>(0);
  const [stakedCreepz, setStakedCreepz] = useState<string[]>([]);
  const [stakedArmouries, setStakedArmouries] = useState<string[]>([]);
  const [unstakedArmouries, setUnstakedArmouries] = useState<number>(0);
  const [totalArmouries, setTotalArmouries] = useState<number>(0);
  const [stakedBlackboxes, setStakedBlackboces] = useState<string[]>([]);
  const [unstakedCreepz, setUnstakedCreepz] = useState<number>(0);
  const [totalCreepz, setTotalCreepz] = useState<number>(0);
  const [isWeb3Loading, setIsWeb3Loading] = useState<boolean>(true);

  const { data: floorData } = useSWR('/api/floorPrices', fetcher);
  const { data } = useSWR('/api/loomiPrice', fetcher);
  const isLoading = useMemo(
    () => !data || !floorData || isWeb3Loading,
    [data, floorData, isWeb3Loading]
  );

  useEffect(() => {
    const getStats = async () => {
      if (!isWeb3Loading) {
        setIsWeb3Loading(true);
      }
      const web3 = new Web3(
        window.ethereum || process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT
      );
      const stats = await getWalletStats(web3, address as string);
      setUserReward(stats.userReward);
      setUserSpent(stats.userSpent);
      setUserYield(stats.userYield);

      setUserBalance(stats.userBalance);

      setStakedCreepz(stats.stakedCreepz);
      setStakedArmouries(stats.stakedArmouries);
      setStakedBlackboces(stats.stakedBlackboxes);
      setUnstakedCreepz(stats.unstakedCreepz);
      setTotalCreepz(stats.totalCreepz);

      setUnstakedArmouries(stats.unstakedArmouries);
      setTotalArmouries(stats.totalArmouries);
      setIsWeb3Loading(false);
    };
    if (addressIsValid) {
      getStats();
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
    floorData,
    isLoading,
  };
}

export default useWalletStats;
