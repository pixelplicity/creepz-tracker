import * as React from 'react';

import { shortenAddress } from '@usedapp/core';
import Link from 'next/link';

import Table from 'components/ui/Table/Table';
import useBLELeaderboard from 'hooks/useBLELeaderboard';
/*
disciplePoints: number;
  gamePoints: number;
  leaderboardGenerationId: string;
  nickname: string | null;
  points: number;
  previousRank: number;
  rank: number;
  shards: number[];
  user: string;
  */
interface IProps {
  lounge: string;
}
const BLETable: React.FunctionComponent<IProps> = ({ lounge }) => {
  const { data } = useBLELeaderboard(lounge);
  const columns = [
    {
      title: 'Rank',
      prop: 'rank',
      isSortable: false,
      render: (row: any) => {
        const change = row.previousRank - row.rank;
        return `${row.rank} (${change < 0 ? '-' : '+'}${Math.abs(change)})`;
      },
    },
    {
      title: 'Wallet',
      prop: 'user',
      render: (row: any) => {
        return (
          <Link href={`/address/${row.user}`}>
            <a className="underline">
              {row.nickname || shortenAddress(row.user)}
            </a>
          </Link>
        );
      },
      isSortable: false,
    },
    {
      title: 'Points',
      prop: 'points',
      render: (row: any) => {
        return row.points.toFixed(1);
      },
      isSortable: false,
    },
    {
      title: 'Spins',
      prop: 'spins',
      isSortable: false,
      render: (row: any) => {
        const change = row.numberOfSpins - row.previousNumberOfSpins;
        return `${row.numberOfSpins} (${change})`;
      },
    },
  ];

  return (
    <Table
      options={{
        columns,
        showSort: true,
        showSearch: true,
      }}
      dataName="wallets"
      data={data?.leaderboard}
    />
  );
};

export default BLETable;
