import useSWR from 'swr';

import type { WalletStats } from 'services/getWalletStats';
import type { WalletTokens } from 'services/getWalletTokens';
import fetcher from 'services/swrFetcher';

function useWalletStats(address?: string): {
  data: WalletStats & WalletTokens;
  isLoading: boolean;
} {
  const { data } = useSWR(`/api/address/${address}`, fetcher);
  return {
    data: data
      ? data.data
      : {
          userReward: 0,
          userBalance: 0,
          userYield: 0,
          userSpent: 0,
          creeps: {
            staked: [],
            unstaked: [],
          },
          armouries: {
            staked: [],
            unstaked: [],
          },
          shapeshifters: [],
          megaShapeshifters: [],
        },
    isLoading: !data,
  };
}

export default useWalletStats;
