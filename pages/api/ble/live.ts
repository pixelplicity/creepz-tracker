import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'services/supabase/client';

import { getBLELeaderboard } from './[leaderboard]';

export type BLESpin = {
  id: string;
  date: string;
  action: string;
  amount: number;
  blockNumber: number;
  address: string;
  hash: string;
};

export type Response = {
  error?: string;
  data?: BLESpin[];
};

export const getBLESpins = async (): Promise<Response> => {
  const spinResponse = await supabase
    .from('mystery_box_activity')
    .select()
    .range(0, 24)
    .order('date', { ascending: false });

  const profiles = await getBLELeaderboard();
  if (spinResponse.error) {
    console.error(spinResponse.error);
    return { error: spinResponse.error.message };
  }

  return {
    data: spinResponse.data.map((spin) => ({
      nickname: profiles.positions.find(
        (profile) => profile.user === spin.address
      )?.nickname,
      ...spin,
    })),
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const cacheKey = `ble-spins`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const response = await getBLESpins();
  if (response.error) {
    res.status(500).json({ error: response.error });
  }
  cache.put(cacheKey, response, 1000 * 30);
  res.json(response);
};

export default handler;
