import { formatInTimeZone } from 'date-fns-tz';
import parseISO from 'date-fns/parseISO';
import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'services/supabase/client';

export type Response = {
  error?: string;
  data?: any[];
};

export const getSpendData = async (): Promise<Response> => {
  const statsResponse = await supabase
    .from('stats')
    .select('date, game_loomi, erc20_loomi, bribes_pool')
    .order('date', { ascending: true });

  if (statsResponse.error) {
    console.error(statsResponse.error);
    return { error: statsResponse.error.message };
  }

  return {
    data: statsResponse.data.map((datum) => ({
      ...datum,
      date: formatInTimeZone(
        parseISO(datum.date),
        'America/New_York',
        'MMM d p'
      ),
    })),
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const cacheKey = `charts-loomi`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const minutes = 5;
  const response = await getSpendData();
  if (response.error) {
    res.status(500).json({ error: response.error });
  }
  cache.put(cacheKey, response, 1000 * 60 * minutes);
  res.json(response);
};

export default handler;
