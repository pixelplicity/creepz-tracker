import * as React from 'react';

import { shortenAddress } from '@usedapp/core';
import Link from 'next/link';

import Table from 'components/ui/Table/Table';
import useBLELeaderboard from 'hooks/useBLELeaderboard';

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
    },
    {
      title: 'Wallet',
      prop: 'wallet_address',
      render: (row: any, prop: string) => {
        return (
          <Link href={`/address/${row[prop]}`}>
            <a className="underline">{shortenAddress(row[prop])}</a>
          </Link>
        );
      },
      isSortable: false,
    },
    {
      title: 'Points',
      prop: 'points',
      isSortable: false,
    },
    {
      title: 'Spins',
      prop: 'spins',
      isSortable: false,
    },
    {
      title: 'Week 1 Shards',
      prop: 'week1_shards',
      isSortable: false,
    },
    // {
    //   title: 'Week 2 Shards',
    //   prop: 'yield',
    //   isSortable: false,
    // },
    // {
    //   title: 'Week 3 Shards',
    //   prop: 'spent',
    //   isSortable: false,
    // },
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
