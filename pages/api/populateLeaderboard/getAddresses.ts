import * as fs from 'fs';

import type { NextApiRequest, NextApiResponse } from 'next';
import Web3 from 'web3';

// import {
//   address as invasionAddress,
//   abi as invasionABI,
// } from 'contracts/CreepzInvasionGrounds/CreepzInvasionGrounds';
import {
  abi as shapeshifterABI,
  address as shapeshifterAddress,
} from 'contracts/Shapeshifters/Shapeshifters';
// import {
//   abi as vaultABI,
//   address as vaultAddress,
// } from 'contracts/Vaults/Vaults';
import type { GameStats } from 'services/gameStats';
import { WalletStats } from 'services/walletStats';

type Response = {
  error?: string;
  ok?: boolean;
};

export type LeaderBoardEntry = WalletStats & {
  walletAddress: string;
};

export type GameStatesEntry = GameStats & {
  totalLoomi: number;
  spentLoomi: number;
  stakedCreepz: number;
  stakedArmouries: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (req.headers.authorization !== `Bearer ${process.env.POPULATE_API_KEY}`) {
    res.status(401).json({
      error: 'Not so fast sneaky lizard!',
    });
    return;
  }
  const dateKey = `${new Date().toISOString()}`;
  fs.writeFileSync('./data/dateKey', dateKey);

  const web3 = new Web3(process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT);

  // const stakingContract = new web3.eth.Contract(invasionABI, invasionAddress);
  // const vaultContract = new web3.eth.Contract(vaultABI, vaultAddress);
  const shapeshifterContract = new web3.eth.Contract(
    shapeshifterABI,
    shapeshifterAddress
  );

  // const creepzTokenMap: Record<string, string[] | undefined> = {};
  // const armouryTokenMap: Record<string, string[] | undefined> = {};
  // const vaultTokenMap: Record<string, string[] | undefined> = {};
  const shapeShifterTokenMap: Record<string, string[] | undefined> = {};

  // const populateCreepzTokenMap = async (startToken: number): Promise<void> => {
  //   console.log('populateCreepzTokenMap', startToken);
  //   if (creepzTokenMap[startToken]) {
  //     console.log(`${startToken} already mapped`);
  //     return;
  //   }
  //   const ownerAddress = await stakingContract.methods
  //     .ownerOf(creepzAddress, startToken)
  //     .call();
  //   console.log(`Owner of creepz #${startToken} is ${ownerAddress}`);
  //   if (ownerAddress !== '0x0000000000000000000000000000000000000000') {
  //     creepzTokenMap[`${startToken}`] = ownerAddress;
  //     const allStaked = await stakingContract.methods
  //       .getStakerTokens(ownerAddress)
  //       .call();
  //     allStaked[0].forEach(async (token: string) => {
  //       creepzTokenMap[`${token}`] = ownerAddress;
  //     });
  //     allStaked[1].forEach(async (token: string) => {
  //       armouryTokenMap[`${token}`] = ownerAddress;
  //     });
  //     console.log(
  //       `${ownerAddress} also owns ${allStaked[0].length} other creepz and ${allStaked[1].length} armouries`
  //     );
  //   } else {
  //     console.log(`Owner address was the zero address`);
  //   }
  // };
  // const populateArmouryTokenMap = async (startToken: number): Promise<void> => {
  //   console.log('populateArmouryTokenMap', startToken);
  //   if (armouryTokenMap[startToken]) {
  //     console.log(`${startToken} already mapped`);
  //     return;
  //   }
  //   const ownerAddress = await stakingContract.methods
  //     .ownerOf(armsAddress, startToken)
  //     .call();
  //   console.log(`Owner of armoury #${startToken} is ${ownerAddress}`);
  //   if (ownerAddress !== '0x0000000000000000000000000000000000000000') {
  //     armouryTokenMap[`${startToken}`] = ownerAddress;
  //   }
  // };
  // const populateVaultTokenMap = async (startToken: number): Promise<void> => {
  //   console.log('populateVaultTokenMap', startToken);
  //   if (vaultTokenMap[startToken]) {
  //     console.log(`${startToken} already mapped`);
  //     return;
  //   }
  //   const ownerAddress = await vaultContract.methods.ownerOf(startToken).call();
  //   console.log(`Owner of vault #${startToken} is ${ownerAddress}`);
  //   if (ownerAddress !== '0x0000000000000000000000000000000000000000') {
  //     vaultTokenMap[`${startToken}`] = ownerAddress;
  //   }
  // };
  const populateSSTokenMap = async (startToken: number): Promise<void> => {
    console.log('populateSSTokenMap', startToken);
    if (shapeShifterTokenMap[startToken]) {
      console.log(`${startToken} already mapped`);
      return;
    }
    const ownerAddress = await shapeshifterContract.methods
      .ownerOf(startToken)
      .call();
    console.log(`Owner of SS #${startToken} is ${ownerAddress}`);
    if (ownerAddress !== '0x0000000000000000000000000000000000000000') {
      shapeShifterTokenMap[`${startToken}`] = ownerAddress;
    }
  };

  // const creepzTokens: number[] = Array.from(Array(11078).keys());
  // const armoryToken: number[] = Array.from(Array(20000).keys());
  // const vaultToken: number[] = Array.from(Array(5000).keys());
  const shapeshifterTokens: number[] = Array.from(Array(20000).keys());
  const starterPromise = Promise.resolve();
  // await creepzTokens.reduce(
  //   (stack: Promise<void>, tokenId: number) =>
  //     stack.then(() => populateCreepzTokenMap(tokenId)),
  //   starterPromise
  // );
  // fs.writeFileSync('data/creepz.json', JSON.stringify(creepzTokenMap));
  // await armoryToken.reduce(
  //   (stack: Promise<void>, tokenId: number) =>
  //     stack.then(() => populateArmouryTokenMap(tokenId)),
  //   starterPromise
  // );
  // fs.writeFileSync('data/armoury.json', JSON.stringify(armouryTokenMap));
  // await vaultToken.reduce(
  //   (stack: Promise<void>, tokenId: number) =>
  //     stack.then(() => populateVaultTokenMap(tokenId)),
  //   starterPromise
  // );
  await shapeshifterTokens.reduce(
    (stack: Promise<void>, tokenId: number) =>
      stack.then(() => populateSSTokenMap(tokenId)),
    starterPromise
  );
  fs.writeFileSync('data/ss.json', JSON.stringify(shapeShifterTokenMap));
  // const allCreepzAddresses = Array.from(
  //   new Set(
  //     Object.keys(creepzTokenMap)
  //       .filter((t) => creepzTokenMap[t])
  //       .map((token: string) => creepzTokenMap[token] || '')
  //   )
  // ) as string[];
  // const allArmouryAddresses = Array.from(
  //   new Set(
  //     Object.keys(armouryTokenMap)
  //       .filter((t) => armouryTokenMap[t])
  //       .map((token: string) => armouryTokenMap[token] || '')
  //   )
  // ) as string[];
  // const allVaultAddresses = Array.from(
  //   new Set(
  //     Object.keys(vaultTokenMap)
  //       .filter((t) => vaultTokenMap[t])
  //       .map((token: string) => vaultTokenMap[token] || '')
  //   )
  // ) as string[];
  // fs.writeFileSync('data/vault.json', JSON.stringify(vaultTokenMap));
  // const allSSAddresses = Array.from(
  //   new Set(
  //     Object.keys(shapeShifterTokenMap)
  //       .filter((t) => shapeShifterTokenMap[t])
  //       .map((token: string) => shapeShifterTokenMap[token] || '')
  //   )
  // ) as string[];
  // const allAddresses = Array.from(
  //   new Set([
  //     ...allCreepzAddresses,
  //     ...allArmouryAddresses,
  //     ...allVaultAddresses,
  //     ...allSSAddresses,
  //   ])
  // ).map((a) => a.toLowerCase());
  // fs.writeFileSync('data/addresses.json', JSON.stringify(allAddresses));
  res.json({ ok: true });
};

export default handler;
