import useSWR from 'swr';

import fetcher from 'services/swrFetcher';
import type { FloorPrices } from 'types';

function useFloorPrice(): { data: FloorPrices; isLoading: boolean } {
  const { data } = useSWR(`/api/floorPrices`, fetcher);
  return {
    data: data
      ? data.prices
      : {
          creepz: 0,
          armoury: 0,
          shapeshifter: 0,
          megaShapeshifter: 0,
          vault: 0,
        },
    isLoading: !data,
  };
}

export default useFloorPrice;
