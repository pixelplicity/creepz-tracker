import useSWR from 'swr';

import fetcher from 'services/swrFetcher';

function useFloorPrice() {
  const { data } = useSWR(`/api/loomiPrice`, fetcher);
  return {
    data: data
      ? data.price
      : {
          eth: 0,
          usd: 0,
        },
    isLoading: !data,
  };
}

export default useFloorPrice;
