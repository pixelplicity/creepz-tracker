import cache from 'memory-cache';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import type { LoomiPrice } from 'types';

type Response = {
  error?: string;
  price?: LoomiPrice;
};

type PriceResponse = {
  data: {
    ethereum: {
      dexTrades: [
        {
          block: {
            timestamp: {
              time: string;
            };
          };
          baseAmount: number;
          quoteAmount: number;
          quotePrice: number;
        }
      ];
    };
  };
};

const getPrice = async (): Promise<Response> => {
  const priceResponse = await fetch('https://graphql.bitquery.io/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.BITQUERY_API_KEY,
    },
    body: JSON.stringify({
      query: `query {ethereum(network: ethereum) {
    dexTrades(
      options: {limit: 1, desc: "block.timestamp.time"}
      exchangeName: {is: "Uniswap"}
      baseCurrency: {is: "0xEb57Bf569Ad976974C1F861a5923A59F40222451"}
      quoteCurrency: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}
    ) {
      block {
        timestamp {
          time(format: "%Y-%m-%d %H:%M:%S")
        }
      }
      baseAmount
      quoteAmount(in: USD)
      quotePrice
    }
  }
}`,
    }),
  });
  if (!priceResponse.ok) {
    return { error: priceResponse.statusText };
  }
  const result = (await priceResponse.json()) as PriceResponse;

  const usdPrice =
    result.data.ethereum.dexTrades[0].quoteAmount /
    result.data.ethereum.dexTrades[0].baseAmount;
  const ethPrice = result.data.ethereum.dexTrades[0].quotePrice;
  return { price: { usd: usdPrice, eth: ethPrice } };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
  }
  const cachedResponse = cache.get('loomi');
  if (cachedResponse && !cachedResponse.error) {
    res.json(cachedResponse);
    return;
  }
  const minutes = 5;
  const response = await getPrice();
  cache.put('loomi', response, 1000 * 60 * minutes);
  res.json(response);
};

export default handler;
