import { useEffect, useState } from 'react';

import useSWR from 'swr';
import Web3 from 'web3';

// import {
//   address as creepzAddress,
//   abi as creepzABI,
// } from 'contracts/Creepz/Creepz';
// import {
//   address as invasionAddress,
//   abi as invasionABI,
// } from 'contracts/CreepzInvasionGrounds/CreepzInvasionGrounds';
import { abi as armsABI, address as armsAddress } from 'contracts/Arms/Arms';
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
  const [totalArmouries, setTotalArmouries] = useState<string>('0');
  const [maxArmouries, setMaxArmouries] = useState<string>('0');
  const { data } = useSWR('/api/loomiPrice', fetcher);

  useEffect(() => {
    const getGameStats = async () => {
      const web3 = new Web3(
        window.ethereum || process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT
      );

      const loomiContract = new web3.eth.Contract(loomiABI, loomiAddress);
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

      const rawTotalArmouries = await armsContract.methods.totalSupply().call();
      setTotalArmouries(rawTotalArmouries);
      const rawMaxArmouries = await armsContract.methods.MAX_SUPPLY().call();
      setMaxArmouries(rawMaxArmouries);
    };
    getGameStats();
  }, []);

  return {
    loomiSupply,
    loomiPrice: data ? data.price : 0,
    bribesDistributed,
    totalArmouries,
    maxArmouries,
  };
}

export default useGameStats;
