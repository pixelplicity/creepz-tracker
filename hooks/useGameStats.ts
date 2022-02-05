import { useEffect, useMemo, useState } from 'react';

import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import useSWR from 'swr';

import { abi as armsABI, address as armsAddress } from 'contracts/Arms/Arms';
import {
  address as creepzAddress,
  abi as creepzABI,
} from 'contracts/Creepz/Creepz';
import {
  abi as loomiABI,
  address as loomiAddress,
} from 'contracts/Loomi/Loomi';

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

function useGameStats() {
  const [loomiSupply, setLoomiSupply] = useState<string>('0');
  const [bribesDistributed, setBribesDistributed] = useState<string>('0');
  const [totalCreepz, setTotalCreepz] = useState<string>('0');
  const [totalArmouries, setTotalArmouries] = useState<string>('0');
  const [isWeb3Loading, setIsWeb3Loading] = useState<boolean>(true);
  const { data: floorData } = useSWR('/api/floorPrices', fetcher);
  const { data: gameData } = useSWR(
    '/api/leaderboard?offset=0&limit=1',
    fetcher
  );
  const { data } = useSWR('/api/loomiPrice', fetcher);
  const isLoading = useMemo(
    () => !data || !gameData || !floorData || isWeb3Loading,
    [data, gameData, floorData, isWeb3Loading]
  );
  useEffect(() => {
    const getGameStats = async () => {
      if (!isWeb3Loading) {
        setIsWeb3Loading(true);
      }
      const web3 = createAlchemyWeb3(
        process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT
      );

      const loomiContract = new web3.eth.Contract(loomiABI, loomiAddress);
      const creepzContract = new web3.eth.Contract(creepzABI, creepzAddress);
      const armsContract = new web3.eth.Contract(armsABI, armsAddress);
      // Supply
      const rawLoomiSupply = await loomiContract.methods.totalSupply().call();
      setLoomiSupply(Number(web3.utils.fromWei(rawLoomiSupply)).toFixed(0));
      // Bribes
      const rawBribesDistributed = await loomiContract.methods
        .bribesDistributed()
        .call();
      setBribesDistributed(
        Number(web3.utils.fromWei(rawBribesDistributed)).toFixed(0)
      );

      const rawTotalCreepz = await creepzContract.methods.totalSupply().call();
      setTotalCreepz(rawTotalCreepz);
      const rawTotalArmouries = await armsContract.methods.totalSupply().call();
      setTotalArmouries(rawTotalArmouries);

      setIsWeb3Loading(false);
    };
    getGameStats();
  }, []);

  return {
    loomiSupply,
    loomiPrice: data ? data.price : 0,
    bribesDistributed,
    totalArmouries,
    totalCreepz,
    gameData,
    floorData,
    isLoading,
  };
}

export default useGameStats;
