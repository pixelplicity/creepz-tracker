import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
  error?: string;
  ok?: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  cache.clear();
  res.json({ ok: true });
};

export default handler;
