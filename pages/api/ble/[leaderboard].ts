import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

export type BLEPlayer = {
  disciplePoints: number;
  gamePoints: number;
  leaderboardGenerationId: string;
  nickname: string | null;
  points: number;
  previousRank: number;
  rank: number;
  shards: number[];
  user: string;
};
export type BLELeaderboard = {
  leaderboardGenerationDate: string;
  leaderboardGenerationId: string;
  positions: BLEPlayer[];
};

const loungeRanges: Record<string, [number, number]> = {
  top3: [0, 3],
  first50: [0, 50],
  next100: [50, 150],
  next200: [150, 350],
  next400: [350, 750],
  next600: [750, 1350],
  next800: [1350, 2150],
  next900: [2150, 3050],
  next1000: [3050, 4050],
};

export type Response = {
  error?: string;
  leaderboard?: BLEPlayer[];
};

export const getBLELeaderboard = async (): Promise<BLELeaderboard> => {
  const cacheKey = `ble-leaderboard`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }
  const leaderboardResponse = await fetch(
    `https://cbc-backend-ajxin.ondigitalocean.app/leaderboard/?items=9999`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!leaderboardResponse.ok) {
    return {
      leaderboardGenerationDate: '',
      leaderboardGenerationId: '',
      positions: [],
    };
  }
  const result = (await leaderboardResponse.json()) as BLELeaderboard;
  const formatted = {
    leaderboardGenerationDate: result.leaderboardGenerationDate,
    leaderboardGenerationId: result.leaderboardGenerationId,
    positions: result.positions.map((player) => ({
      ...player,
      rank: player.rank + 1,
      previousRank: player.previousRank + 1,
    })),
  };
  cache.put(cacheKey, formatted, 1000 * 60 * 3); // 3 minutes
  return formatted;
};

const getLizards = async (lounge: string): Promise<Response> => {
  const range = loungeRanges[lounge] as [number, number];
  const leaderboard = await getBLELeaderboard();
  const subset = leaderboard.positions.slice(range[0], range[1]);

  return {
    leaderboard: subset,
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
