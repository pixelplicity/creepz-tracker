import useSWR from 'swr';

import fetcher from 'services/swrFetcher';

function useWalletStats(address?: string) {
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
