import { useEffect, useState } from 'react';

import Web3 from 'web3';

// import {
//   address as creepzAddress,
//   abi as creepzABI,
// } from 'contracts/Creepz/Creepz';
// import {
//   address as invasionAddress,
//   abi as invasionABI,
// } from 'contracts/CreepzInvasionGrounds/CreepzInvasionGrounds';
import {
  abi as loomiABI,
  address as loomiAddress,
} from 'contracts/Loomi/Loomi';

function useGameStats() {
  const [loomiSupply, setLoomiSupply] = useState<string>('0');
  const [bribesDistributed, setBribesDistributed] = useState<string>('0');

  useEffect(() => {
    const getGameStats = async () => {
      const web3 = new Web3(
        window.ethereum || process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT
      );

      const loomiContract = new web3.eth.Contract(loomiABI, loomiAddress);
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
    };
    getGameStats();
  }, []);

  return {
    loomiSupply,
    bribesDistributed,
  };
}

export default useGameStats;
