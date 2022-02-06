import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'services/supabase/client';
import type { BLELizard } from 'services/supabase/types';

const loungeRanges: Record<string, [number, number]> = {
  top3: [0, 2],
  first50: [0, 49],
  next100: [50, 149],
  next200: [150, 349],
  next400: [350, 749],
  next600: [750, 1349],
  next800: [1350, 2149],
  next900: [2150, 3049],
  next1000: [3050, 4049],
};

export type Response = {
  error?: string;
  leaderboard?: BLELizard & { rank: number }[];
};

const getLizards = async (lounge: string): Promise<Response> => {
  const range = loungeRanges[lounge] as [number, number];
  const lizardsResponse = await supabase
    .from('ble_lizards')
    .select()
    .order('points', { ascending: false })
    .range(range[0], range[1]);

  if (lizardsResponse.error) {
    console.error(lizardsResponse.error);
    return { error: lizardsResponse.error.message };
  }

  const withRank = lizardsResponse.data.map((lizard, index) => ({
    ...lizard,
    rank: index + 1 + range[0],
  })) as BLELizard & { rank: number }[];

  return {
    leaderboard: withRank,
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const lounge = req.query.leaderboard as string;
  const cacheKey = `ble-${lounge}`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const minutes = 5;
  const response = await getLizards(lounge);
  if (response.error) {
    res.status(500).json({ error: response.error });
  }
  cache.put(cacheKey, response, 1000 * 60 * minutes);
  res.json(response);
};

export default handler;
