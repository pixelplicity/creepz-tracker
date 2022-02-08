import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getBLELeaderboard, BLEPlayer } from './[leaderboard]';

export type Response = {
  error?: string;
  data?: BLEPlayer[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const cacheKey = `ble-profiles`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const minutes = 30;
  const leaderboard = await getBLELeaderboard();
  const response = {
    data: leaderboard.positions,
  };

  cache.put(cacheKey, response, 1000 * 60 * minutes);
  res.json(response);
};

export default handler;
