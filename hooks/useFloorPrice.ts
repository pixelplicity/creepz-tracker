import useSWR from 'swr';

import fetcher from 'services/swrFetcher';

function useFloorPrice() {
  const { data } = useSWR(`/api/floorPrices`, fetcher);
  return {
    data: data
      ? data.prices
      : {
          creepz: 0,
          armoury: 0,
        },
    isLoading: !data,
  };
}

export default useFloorPrice;
