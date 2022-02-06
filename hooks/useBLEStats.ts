import useSWR from 'swr';

import type { BLEStats } from 'services/supabase/types';
import fetcher from 'services/swrFetcher';

function useBLEStats(): { data: BLEStats; isLoading: boolean } {
  const { data } = useSWR(`/api/ble`, fetcher, {
    refreshInterval: 1000 * 60 * 5,
  });
  return {
    data: data
      ? data.ble
      : {
          spins: 0,
          lizards: 0,
        },
    isLoading: !data,
  };
}

export default useBLEStats;
