import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import type { FloorPrices } from 'types';

type Response = {
  error?: string;
  prices?: FloorPrices;
};

type FloorStatsResponse = {
  stats: {
    id: number;
    created_at: string;
    updated_at: string;
    chain: string;
    marketplace: string;
    collection_id: string;
    contract_address: string;
    floor_price: number;
    avg_1d: number;
    avg_7d: number;
    avg_30d: number;
    avg_all_time: number;
    volume_1d: number;
    volume_7d: number;
    volume_30d: number;
    volume_all_time: number;
    change_1d: number;
    change_7d: number;
    change_30d: 0;
    supply: number;
    num_owners: number;
    num_reports: number;
    activity_in_last_refresh_period: number;
    thirty_day_average_price: number;
    thirty_day_volume: number;
    thirty_day_change: number;
    thirty_day_sales: number;
    seven_day_average_price: number;
    seven_day_volume: number;
    seven_day_change: number;
    seven_day_sales: number;
    one_day_average_price: number;
    one_day_volume: number;
    one_day_change: number;
    one_day_sales: number;
    market_cap: number;
    count: number;
    total_supply: number;
    total_volume: number;
    total_sales: number;
    average_price: number;
  };
};

const makeFloorPriceRequest =
  (id: string): (() => Promise<number>) =>
  async (): Promise<number> => {
    const priceResponse = await fetch(
      `https://api.floornfts.io/eth/collection/${id}/stats`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!priceResponse.ok) {
      return 0;
    }
    const result = (await priceResponse.json()) as FloorStatsResponse;
    return result.stats.floor_price;
  };

const getCreepzPrice = makeFloorPriceRequest('genesis-creepz');
const getArmouryPrice = makeFloorPriceRequest('reptile-armoury');
const getVaultPrice = makeFloorPriceRequest('creepz-loomi-vault');
const getSSPrice = makeFloorPriceRequest('creepz-shapeshifterz');
const getMegaSSPrice = makeFloorPriceRequest('creepz-mega-shapeshifterz');

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const cachedResponse = cache.get('floorPrice');
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const minutes = 1;
  const [creepzPrice, armouryPrice, vaultPrice, ssPrice, megaSSPrice] =
    await Promise.all([
      getCreepzPrice(),
      getArmouryPrice(),
      getVaultPrice(),
      getSSPrice(),
      getMegaSSPrice(),
    ]);
  const response = {
    prices: {
      creepz: creepzPrice,
      armoury: armouryPrice,
      vault: vaultPrice,
      shapeshifter: ssPrice,
      megaShapeshifter: megaSSPrice,
    },
  };
  cache.put('floorPrice', response, 1000 * 60 * minutes);
  res.json(response);
};

export default handler;
