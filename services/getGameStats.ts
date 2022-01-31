import type Web3 from 'web3';

import {
  abi as loomiABI,
  address as loomiAddress,
} from 'contracts/Loomi/Loomi';

export type GameStats = {
  erc20Loomi: number;
  bribesPool: number;
  bribesDistributed: number;
};
export default async function getGameStats(web3: Web3): Promise<GameStats> {
  const loomiContract = new web3.eth.Contract(loomiABI, loomiAddress);
  // ERC20 Loomi
  const rawERC20Loomi = await loomiContract.methods.totalSupply().call();
  // Bribes Distributed
  const rawBribes = await loomiContract.methods
    .activeTaxCollectedAmount()
    .call();
  // Bribe Pool
  const rawBribesPaid = await loomiContract.methods.bribesDistributed().call();

  return {
    erc20Loomi: +Number(web3.utils.fromWei(rawERC20Loomi)).toFixed(0),
    bribesPool: +Number(web3.utils.fromWei(rawBribes)).toFixed(0),
    bribesDistributed: +Number(web3.utils.fromWei(rawBribesPaid)).toFixed(0),
  };
}
