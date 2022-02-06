import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'services/supabase/client';
import type { BLEStats } from 'services/supabase/types';

export type Response = {
  error?: string;
  ble?: BLEStats;
};

const getLeaderboard = async (): Promise<Response> => {
  const statsResponse = await supabase
    .from('ble_stats')
    .select()
    .eq('id', '658dc8e8-6d6c-424d-83e5-8623507c684a');

  if (statsResponse.error) {
    console.error(statsResponse.error);
    return { error: statsResponse.error.message };
  }

  return {
    ble: statsResponse.data[0],
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const cacheKey = `ble-stats`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const minutes = 5;
  const response = await getLeaderboard();
  if (response.error) {
    res.status(500).json({ error: response.error });
  }
  cache.put(cacheKey, response, 1000 * 60 * minutes);
  res.json(response);
};

export default handler;
