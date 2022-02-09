import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getBLELeaderboard } from 'pages/api/ble/[leaderboard]';
import getWalletStats from 'services/getWalletStats';
import type { WalletStats } from 'services/getWalletStats';
import getWalletTokens from 'services/getWalletTokens';
import type { WalletTokens } from 'services/getWalletTokens';

type TaxClaimResponse = {
  amount: number;
};

type ProfileResponse = {
  address: string;
  nickname: string | null;
  points: number;
  rank: number;
  shards: number[];
  disciplePoints: number;
  gamePoints: number;
  numberOfSpins: number;
  previousNumberOfSpins: number;
};

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT);

const getWalletProfile = async (address: string): Promise<ProfileResponse> => {
  const cacheKey = `address-profile-${address}`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }
  const allProfiles = await getBLELeaderboard();
  const profileResponse = await fetch(
    `https://cbc-backend-ajxin.ondigitalocean.app/users/${address}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const extraProfile = allProfiles.positions.find(
    (p) => p.user.toLowerCase() === address.toLowerCase()
  );
  if (!profileResponse.ok) {
    return {
      address,
      nickname: null,
      points: 0,
      rank: 0,
      shards: [0, 0, 0],
      disciplePoints: 0,
      gamePoints: 0,
      numberOfSpins: 0,
      previousNumberOfSpins: 0,
    };
  }
  const result = (await profileResponse.json()) as ProfileResponse;
  result.numberOfSpins = extraProfile?.numberOfSpins ?? 0;
  result.previousNumberOfSpins = extraProfile?.previousNumberOfSpins ?? 0;
  cache.put(cacheKey, result, 1000 * 60 * 3); // 3 minutes
  return result;
};

const getTaxClaimable = async (address: string): Promise<number> => {
  const cacheKey = `address-tax-${address}`;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) {
    return cachedResponse;
  }
  const taxResponse = await fetch(
    `https://cbc-backend-ajxin.ondigitalocean.app/megas/user-tax-claimable`,
    {
      method: 'POST',
      body: JSON.stringify({ user: address.toLowerCase() }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!taxResponse.ok) {
    return 0;
  }
  const result = (await taxResponse.json()) as TaxClaimResponse;
  const formatted = Math.round(+Number(web3.utils.fromWei(`${result.amount}`)));
  cache.put(cacheKey, formatted, 1000 * 60 * 20); // 20 minutes
  return formatted;
};

export type Response = {
  error?: string;
  data?: WalletStats & WalletTokens & { taxClaimable: number };
};

const getAddress = async (address: string): Promise<Response> => {
  const [tokens, stats] = await Promise.all([
    getWalletTokens(address),
    getWalletStats(address),
  ]);
  const claimableTax = await getTaxClaimable(address);
  const profile = await getWalletProfile(address);
  return {
    data: {
      ...tokens,
      ...stats,
      ...profile,
      taxClaimable: claimableTax,
    },
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const { address } = req.query;
  const ownerAddress = address as string;
  const cacheKey = `address-${ownerAddress}`;

  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const minutes = 1;
  const response = await getAddress(ownerAddress);
  if (response.error) {
    res.status(500).json({ error: response.error });
  }
  cache.put(cacheKey, response, 1000 * 60 * minutes);
  res.json(response);
};

export default handler;
