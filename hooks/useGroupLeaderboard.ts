import React from 'react';

import useSWR from 'swr';

import { Response } from 'pages/api/leaderboard/[group]';
import fetcher from 'services/swrFetcher';

export type GroupLeaderboardHookValue = {
  data: Response | undefined;
  isLoading: boolean;
  updateOffset: (offset: number) => void;
  offset: number;
  updateSearch: (addressSearch: string) => void;
  search: string | undefined;
  updateSort: (sort: string) => void;
  sort: string;
};
function useGroupLeaderboard(
  group: string | undefined,
  pageSize: number
): GroupLeaderboardHookValue {
  const [sort, setSort] = React.useState<string>('reward');
  const [addressSearch, setAddressSearch] = React.useState<string>();
  const [offset, setOffset] = React.useState<number>(0);
  const { data } = useSWR(
    `/api/leaderboard/${group}?offset=${offset}&limit=${pageSize}&sort=${sort}${
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
    updateSort: setSort,
    sort,
  };
}

export default useGroupLeaderboard;
