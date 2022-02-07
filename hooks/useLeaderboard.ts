import React from 'react';

import useSWR from 'swr';

import type { Response } from 'pages/api/leaderboard';
import fetcher from 'services/swrFetcher';

export type LeaderboardHookValue = {
  data: Response | undefined;
  isLoading: boolean;
  updateOffset: (offset: number) => void;
  offset: number;
  updateSearch: (addressSearch: string) => void;
  search: string | undefined;
  updateSort: (sort: string) => void;
  sort: string;
};
function useLeaderboard(pageSize: number): LeaderboardHookValue {
  const [sort, setSort] = React.useState<string>('ble_points');
  const [addressSearch, setAddressSearch] = React.useState<string>();
  const [offset, setOffset] = React.useState<number>(0);
  const { data } = useSWR(
    `/api/leaderboard?offset=${offset}&limit=${pageSize}&sort=${sort}${
      addressSearch && addressSearch !== '' && addressSearch.length >= 3
        ? `&search=${addressSearch}`
        : ''
    }`,
    fetcher
  );

  return {
    data,
    isLoading: !data,
    updateOffset: setOffset,
    offset,
    updateSearch: setAddressSearch,
    search: addressSearch,
    updateSort: (newSort: string) => {
      setSort(newSort);
      setOffset(0);
    },
    sort,
  };
}

export default useLeaderboard;
