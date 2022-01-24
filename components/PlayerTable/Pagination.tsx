import * as React from 'react';

import LoadingText from 'components/ui/LoadingText/LoadingText';
import type { LeaderboardResponse } from 'types';

interface IProps {
  pageSize: number;
  offset: number;
  updateOffset: (offset: number) => void;
  addressSearch?: string;
  data: LeaderboardResponse;
}
const Pagination: React.FunctionComponent<IProps> = ({
  pageSize,
  offset,
  updateOffset,
  addressSearch = '',
  data,
}) => {
  return (
    <nav
      className="py-2 flex items-center justify-between"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <LoadingText isLoading={!data}>
          {data && (
            <p className="text-sm text-creepz-green-light creepz-glowy-text">
              Showing {offset + 1} - {offset + data.leaderboard.players.length}{' '}
              wallets{' '}
              {addressSearch && addressSearch.length >= 3 && (
                <span>containing &quot;{addressSearch}&quot;</span>
              )}
            </p>
          )}
        </LoadingText>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-1 text-sm font-medium text-black bg-creepz-green-light"
          onClick={() => updateOffset(offset - pageSize)}
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-1 text-sm font-medium text-black bg-creepz-green-light"
          onClick={() => updateOffset(offset + pageSize)}
        >
          Next
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
