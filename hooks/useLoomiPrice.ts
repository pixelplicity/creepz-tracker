import useSWR from 'swr';

import fetcher from 'services/swrFetcher';
import type { FloorPrices } from 'types';

function useFloorPrice(): { data: FloorPrices; isLoading: boolean } {
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
