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
}): Promise<Response> => {
  const statsResponse = await supabase
    .from('stats')
    .select()
    .order('date', { ascending: false })
    .single();

  if (statsResponse.error) {
    return { error: statsResponse.error.message };
  }
  let playerQuery = supabase
    .from('players')
    .select()
    .eq('date', statsResponse.data.date);

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
  if (options.search) {
    playerQuery = playerQuery?.like('wallet_address', `%${options.search}%`);
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
  return {
    leaderboard: {
      game: statsResponse.data,
      players: playersResponse.data,
    },
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const { limit, offset, sort, search } = req.query;
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
  });
  if (response.error) {
    res.status(500).json({ error: response.error });
  }
  cache.put(cacheKey, response, 1000 * 60 * 60 * hours);
  res.json(response);
};

export default handler;
