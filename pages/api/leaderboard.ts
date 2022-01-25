import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'services/supabase';

import type {
  LeaderBoardEntry,
  GameStatesEntry,
} from './populateLeaderboard/getAddressStats';

export type Leaderboard = {
  game: GameStatesEntry;
  players: LeaderBoardEntry[];
};

type Response = {
  error?: string;
  leaderboard?: Leaderboard;
};

const getLeaderboard = async (options: {
  limit: number;
  offset: number;
  sort?: string;
  search?: string;
  group?: string;
}): Promise<Response> => {
  const statsResponse = await supabase
    .from('stats')
    .select()
    .order('date', { ascending: false });

  if (statsResponse.error) {
    return { error: statsResponse.error.message };
  }

  let playerQuery = supabase
    .from('players')
    .select()
    .eq('date', statsResponse.data[0].date);

  if (options.sort) {
    if (options.sort.indexOf('-') === 0) {
      playerQuery = playerQuery.order(options.sort.substring(1), {
        ascending: true,
      });
    } else {
      playerQuery = playerQuery.order(options.sort, {
        ascending: false,
      });
    }
  }
  let groupData: {
    name: string;
    address: string;
  }[] = [];
  if (options.group) {
    const groupResponse = await supabase
      .from('groups')
      .select()
      .eq('name', options.group);

    if (groupResponse.error) {
      return { error: groupResponse.error.message };
    }
    const group = groupResponse.data[0];
    playerQuery = playerQuery?.in(
      'wallet_address',
      group.addresses.map((d: { name: string; address: string }) =>
        d.address.toLowerCase()
      )
    );
    groupData = group.addresses;
  }
  if (options.search) {
    playerQuery = playerQuery?.like(
      'wallet_address',
      `%${options.search.toLowerCase()}%`
    );
  }
  playerQuery = playerQuery.range(
    options.offset,
    options.offset + options.limit - 1
  );
  const playersResponse = await playerQuery;

  if (!playersResponse) {
    return { error: 'No players found' };
  }

  if (playersResponse.error) {
    return { error: playersResponse.error.message };
  }
  let players = playersResponse.data;
  if (options.group) {
    players = playersResponse.data.map((player) => {
      return {
        ...player,
        name: groupData.find(
          (a) => a.address.toLowerCase() === player.wallet_address.toLowerCase()
        )?.name,
      };
    });
  }
  return {
    leaderboard: {
      game: statsResponse.data[0],
      players,
    },
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const { limit, offset, sort, search, group } = req.query;
  const cacheKey = `leaderboard-${JSON.stringify(req.query)}`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const hours = 12;
  const response = await getLeaderboard({
    limit: +(limit || 25) as number,
    offset: +(offset || 0) as number,
    sort: sort ? `${sort}` : 'reward',
    search: (search || '') as string,
    group: (group || '') as string,
  });
  if (response.error) {
    res.status(500).json({ error: response.error });
  }
  cache.put(cacheKey, response, 1000 * 60 * 60 * hours);
  res.json(response);
};

export default handler;
