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
          vaults: {
            staked: [],
            unstaked: [],
          },
          shapeshifters: [],
          megaShapeshifters: [],
          address,
          nickname: null,
          points: 0,
          rank: 0,
          shards: [0, 0, 0],
          disciplePoints: 0,
          gamePoints: 0,
          userItems: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
          ],
          userSpins: 0,
          numberOfSpins: 0,
          previousNumberOfSpins: 0,
        },
    isLoading: !data,
  };
}

export default useWalletStats;
