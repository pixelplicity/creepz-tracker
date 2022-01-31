import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'services/supabase/client';
import type { GroupStats, Player } from 'services/supabase/types';

export type GroupLeaderboard = {
  game: GroupStats;
  players: Player[];
};

export type Response = {
  error?: string;
  leaderboard?: GroupLeaderboard;
};

const getGroup = async (options: {
  limit: number;
  offset: number;
  sort?: string;
  search?: string;
  group?: string;
}): Promise<Response> => {
  const groupResponse = await supabase
    .from('groups')
    .select()
    .eq('name', options.group);

  if (groupResponse.error) {
    return { error: groupResponse.error.message };
  }
  if (groupResponse.data.length === 0) {
    return { error: 'Group not found' };
  }
  const groupData = groupResponse.data[0];

  const groupStatsResponse = await supabase
    .from('group_stats')
    .select()
    .eq('group', groupData.id)
    .order('date', { ascending: false });

  if (groupStatsResponse.error) {
    console.error(groupStatsResponse.error);
    return { error: groupStatsResponse.error.message };
  }

  let playerQuery = supabase
    .from('players')
    .select()
    .eq('date', groupStatsResponse.data[0].date);

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
  let groupAddresses: {
    name: string;
    address: string;
  }[] = [];

  playerQuery = playerQuery?.in(
    'wallet_address',
    groupData.addresses.map((d: { name: string; address: string }) =>
      d.address.toLowerCase()
    )
  );
  groupAddresses = groupData.addresses;
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
  players = playersResponse.data.map((player) => {
    return {
      ...player,
      name: groupAddresses.find(
        (a) => a.address.toLowerCase() === player.wallet_address.toLowerCase()
      )?.name,
    };
  });

  return {
    leaderboard: {
      game: groupStatsResponse.data[0],
      players,
    },
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const { limit, offset, sort, search, group } = req.query;
  const cacheKey = `group-${JSON.stringify(req.query)}`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
  }
  const hours = 3;
  const response = await getGroup({
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
