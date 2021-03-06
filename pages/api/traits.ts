import groupBy from 'lodash.groupby';
import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Trait, TraitType } from 'types';

import allTraitsJSON from './traits.json';

type PackResponse = {
  _id: string;
  id: string;
  category: TraitType & 'Shard';
  odds: number[];
  traitIds: string[];
  isActive: boolean;
  lamexPrice: number;
  shardsPrices: number[];
  totalSupply: number;
  currentSupply: number;
  __v: number;
};

type TraitResponse = {
  _id: string;
  title: string;
  category: TraitType;
  image: string;
  initialSupply: number;
  rarity: number;
  isOnSale: boolean;
  lamexPrice: number;
  shardsPrice: number;
  claimedCount: number;
  __v: number;
};

type PackWithDetails = PackResponse & {
  traits: TraitResponse[];
};

export type Response = {
  error?: string;
  data?: Record<string, Trait[]>;
};

export const getPacks = async (): Promise<PackResponse[]> => {
  const cacheKey = `creepz-packs`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }
  const packsResponse = await fetch(
    `https://cbc-backend-ajxin.ondigitalocean.app/packs`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!packsResponse.ok) {
    return [];
  }
  const result = (await packsResponse.json()) as PackResponse[];
  cache.put(cacheKey, result, 1000 * 60 * 60 * 24); // 24 hours
  return result;
};

export const getMarketplaceTraits = async (): Promise<TraitResponse[]> => {
  const cacheKey = `creepz-marketplacetraits`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }
  const traitResponse = await fetch(
    `https://cbc-backend-ajxin.ondigitalocean.app/traits/?isOnSale=true`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const result = (await traitResponse.json()) as TraitResponse[];
  cache.put(cacheKey, result, 1000 * 60 * 5); // 5 mniutes
  return result;
};

export const getAllTraits = async (): Promise<TraitResponse[]> => {
  const cacheKey = `creepz-all-traits`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }
  const traitResponse = await fetch(
    `https://cbc-backend-ajxin.ondigitalocean.app/traits`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const result = (await traitResponse.json()) as TraitResponse[] & {
    error?: string;
    message?: string;
    statusCode?: number;
  };
  if (result.statusCode && result.statusCode === 400) {
    return allTraitsJSON as TraitResponse[];
  }
  cache.put(cacheKey, result, 1000 * 60 * 5); // 5 minutes
  return result;
};

export const getTraits = async (): Promise<Record<string, Trait[]>> => {
  const cacheKey = `creepz-traits`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }

  const allPacks = await getPacks();
  const allTraits = await getAllTraits();
  const packsWithDetails: PackWithDetails[] = await Promise.all(
    allPacks.map(async (pack) => {
      const traits = await Promise.all(
        pack.traitIds.map(async (traitId) => {
          const traitDetail = allTraits.find((t) => t._id === traitId) as TraitResponse;// eslint-disable-line
          return traitDetail;
        })
      );
      return {
        ...pack,
        traits: traits.filter((t) => t),
      };
    })
  );

  let flattenedTraits: Trait[] = [];
  packsWithDetails.forEach((pack) => {
    const isShard = pack.category === 'Shard';
    flattenedTraits = [
      ...flattenedTraits,
      ...pack.traits.map(
        (t: TraitResponse): Trait => ({
          image: t.image,
          name: t.title,
          category: t.category,
          supply: t.initialSupply,
          remaining: t.initialSupply - t.claimedCount,
          rarity: t.rarity,
          isOnSale: false,
          isShardPack: isShard,
        })
      ),
    ];
  });

  const marketplaceTraits = await getMarketplaceTraits();
  marketplaceTraits.forEach((t: TraitResponse) => {
    flattenedTraits = [
      ...flattenedTraits,
      {
        image: t.image,
        name: t.title,
        category: t.category,
        supply: t.initialSupply,
        remaining: t.initialSupply - t.claimedCount,
        rarity: t.rarity,
        isOnSale: t.isOnSale,
        isShardPack: false,
      },
    ];
  });

  const groupedTraits = groupBy(flattenedTraits, 'category');
  cache.put(cacheKey, groupedTraits, 1000 * 60 * 60 * 24); // 24 hours
  return groupedTraits;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const cacheKey = `traits`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const traits = await getTraits();
  const response = {
    data: traits,
  };

  cache.put(cacheKey, response, 1000 * 60 * 3); // 3 minutes
  res.json(response);
};

export default handler;
