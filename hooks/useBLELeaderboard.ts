import useSWR from 'swr';

import type { Response } from 'pages/api/ble/[leaderboard]';
import fetcher from 'services/swrFetcher';

export type LeaderboardHookValue = {
  data: Response | undefined;
  isLoading: boolean;
};
function useBLELeaderboard(lounge: string): LeaderboardHookValue {
  const { data } = useSWR(`/api/ble/${lounge}`, fetcher, {
    refreshInterval: 1000 * 60 * 5,
  });

  return {
    data,
    isLoading: !data,
  };
}

export default useBLELeaderboard;
