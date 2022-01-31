import * as fs from 'fs';

import type { NextApiRequest, NextApiResponse } from 'next';
import { pRateLimit } from 'p-ratelimit';
import promiseRetry from 'promise-retry';
import Web3 from 'web3';

import getGameStats from 'services/gameStats';
import type { GameStats } from 'services/gameStats';
import supabase from 'services/supabase';
import getWalletStats, { WalletStats } from 'services/walletStats';

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

const limit = pRateLimit({
  interval: 1000, // 1000 ms == 1 second
  rate: 10, // 30 API calls per interval
  concurrency: 10, // no more than 10 running at once
});

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
  const allAddresses = JSON.parse(
    fs.readFileSync('data/addresses.json').toString()
  ) as string[];
  const dateKey = fs.readFileSync('./data/dateKey').toString();
  const now = new Date(dateKey);

  const web3 = new Web3(process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT);

  const leaderBoard: LeaderBoardEntry[] = [];

  const existingPlayersResponse = await supabase
    .from('players')
    .select('wallet_address')
    .eq('date', now.toISOString());

  if (existingPlayersResponse.error) {
    res.status(500).json({ error: existingPlayersResponse.error.message });
  }

  const existingAddresses = existingPlayersResponse.data
    ? existingPlayersResponse.data.map((d) => d.wallet_address)
    : [];

  const vaultTokenMap: Record<string, string> = JSON.parse(
    fs.readFileSync('data/vaults.json').toString()
  );
  const ssTokenMap = JSON.parse(fs.readFileSync('data/ss.json').toString());
  const vaultOwners: Record<string, string[]> = {};
  Object.entries(vaultTokenMap).forEach((entry) => {
    const [tokenId, address] = entry as [string, string];
    if (!Object.hasOwnProperty.call(vaultOwners, address)) {
      vaultOwners[address] = [];
    }
    const addressTokens = vaultOwners[address] as string[];
    if (addressTokens) {
      addressTokens.push(tokenId);
    }
  });
  const ssOwners: Record<string, string[]> = {};
  Object.entries(ssTokenMap).forEach((entry) => {
    const [tokenId, address] = entry as [string, string];
    if (!Object.hasOwnProperty.call(ssOwners, address)) {
      ssOwners[address] = [];
    }
    const addressTokens = ssOwners[address] as string[];
    if (addressTokens) {
      addressTokens.push(tokenId);
    }
  });

  const getWalletMetadata = async (
    address: string
  ): Promise<LeaderBoardEntry> => {
    const stats = await promiseRetry(
      (retry: any, i: number) => {
        console.log('>', i);
        return getWalletStats(web3, address).catch(retry);
      },
      { retries: 3 }
    );

    return {
      walletAddress: address.toLowerCase(),
      ...stats,
    };
  };

  await Promise.all(
    allAddresses
      .filter((address) => !existingAddresses.includes(address))
      .map((address: string | undefined, index: number) => {
        if (
          address &&
          address !== '0x0000000000000000000000000000000000000000'
        ) {
          return limit(async () => {
            console.log(index, address);
            const walletStats = await getWalletMetadata(address);
            // const vaults = leaderBoard.push(walletStats);

            return supabase.from('players').insert({
              date: now,
              wallet_address: walletStats.walletAddress,
              erc20_balance: walletStats.userBalance,
              reward: walletStats.userReward,
              spent: walletStats.userSpent,
              yield: walletStats.userYield,
              staked_creepz: walletStats.stakedCreepz,
              number_staked_creepz: walletStats.stakedCreepz.length,
              staked_armouries: walletStats.stakedArmouries,
              number_staked_armouries: walletStats.stakedArmouries.length,
              // vaults: walletStats.mintedVaults,
              // shapeshifters: walletStats.mintedShapeshifters,
              // number_shapeshifters: walletStats.numberShapeshifters,
              // number_vaults: walletStats.numberVaults,
            });
          });
        }
        return Promise.resolve();
      })
  );

  const rawGameStats = await getGameStats(web3);
  const gameStatsEntry = {
    ...rawGameStats,
    totalLoomi: leaderBoard.reduce((acc, cur) => acc + cur.userReward, 0),
    spentLoomi: leaderBoard.reduce((acc, cur) => acc + cur.userSpent, 0),
    yieldLoomi: leaderBoard.reduce((acc, cur) => acc + cur.userYield, 0),
    stakedCreepz: leaderBoard.reduce(
      (acc, cur) => acc + cur.stakedCreepz.length,
      0
    ),
    stakedArmouries: leaderBoard.reduce(
      (acc, cur) => acc + cur.stakedArmouries.length,
      0
    ),
  };

  const statsInsertResponse = await supabase.from('stats').insert({
    date: now,
    players: allAddresses.length,
    bribes_paid: gameStatsEntry.bribesDistributed,
    erc20_loomi: gameStatsEntry.erc20Loomi,
    game_loomi: gameStatsEntry.totalLoomi,
    yield_loomi: gameStatsEntry.yieldLoomi,
    spent_loomi: gameStatsEntry.spentLoomi,
    staked_creepz: gameStatsEntry.stakedCreepz,
    staked_armouries: gameStatsEntry.stakedArmouries,
  });

  if (statsInsertResponse.error) {
    res.status(500).json({ error: statsInsertResponse.error.message });
  }
  fs.writeFileSync('data/addressStats.json', JSON.stringify(leaderBoard));
  fs.writeFileSync('data/gameStats.json', JSON.stringify(gameStatsEntry));
  res.json({ ok: true });
};

export default handler;
