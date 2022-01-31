import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';
import web3 from 'web3';

import getWalletStats from 'services/getWalletStats';
import type { WalletStats } from 'services/getWalletStats';
import getWalletTokens from 'services/getWalletTokens';
import type { WalletTokens } from 'services/getWalletTokens';

type TaxClaimResponse = {
  amount: number;
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

  return {
    data: {
      ...tokens,
      ...stats,
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
