import type { NextApiRequest, NextApiResponse } from 'next';

import getWalletStats from 'services/getWalletStats';
import type { WalletStats } from 'services/getWalletStats';
import getWalletTokens from 'services/getWalletTokens';
import type { WalletTokens } from 'services/getWalletTokens';

type Response = {
  error?: string;
  data?: WalletStats & WalletTokens;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const { address } = req.query;
  const ownerAddress = address as string;
  const [tokens, stats] = await Promise.all([
    getWalletTokens(ownerAddress),
    getWalletStats(ownerAddress),
  ]);

  res.json({
    data: {
      ...tokens,
      ...stats,
    },
  });
};

export default handler;
