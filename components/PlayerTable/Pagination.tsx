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
  const canPrev = data?.leaderboard ? offset > 0 : false;
  const canNext = data?.leaderboard?.game?.players
    ? data.leaderboard.game.players > offset + pageSize
    : false;
  const showButtons = data?.leaderboard?.players.length > pageSize;
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
      {showButtons && (
        <div className="flex-1 flex justify-between sm:justify-end">
          <a
            href="#"
            className={`${
              !canPrev
                ? 'cursor-disabled text-gray-900 bg-creepz-green'
                : 'bg-creepz-green-light'
            } relative inline-flex items-center px-4 py-1 text-sm font-medium text-black`}
            onClick={() => {
              if (canPrev) {
                updateOffset(offset - pageSize);
              }
            }}
          >
            Previous
          </a>
          <a
            href="#"
            className={`${
              !canNext
                ? 'cursor-disabled text-gray-900 bg-creepz-green'
                : 'bg-creepz-green-light'
            } ml-3 relative inline-flex items-center px-4 py-1 text-sm font-medium text-black bg-creepz-green-light`}
            onClick={() => {
              if (canNext) {
                updateOffset(offset + pageSize);
              }
            }}
          >
            Next
          </a>
        </div>
      )}
    </nav>
  );
};

export default Pagination;
