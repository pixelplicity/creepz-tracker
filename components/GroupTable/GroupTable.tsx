import * as React from 'react';

import { shortenAddress } from '@usedapp/core';
import Link from 'next/link';

import Table from 'components/ui/Table/Table';
import useGroupLeaderboard from 'hooks/useGroupLeaderboard';

const sortOptions = [
  {
    display: 'ERC-20 Loomi',
    prop: 'erc20_balance',
  },
  {
    display: 'Name',
    prop: 'name',
  },
  {
    display: 'Points',
    prop: 'ble_points',
  },
  {
    display: 'Loomi',
    prop: 'reward',
  },
  {
    display: 'Yield',
    prop: 'yield',
  },
  // {
  //   display: 'Spent',
  //   prop: 'spent',
  // },
  {
    display: 'Staked Creepz',
    prop: 'number_staked_creepz',
  },
  {
    display: 'Staked Armouries',
    prop: 'number_staked_armouries',
  },
  {
    display: 'Staked Vaults',
    prop: 'number_staked_vaults',
  },
  {
    display: 'Megas',
    prop: 'number_mega_shapeshifters',
  },
];

interface IProps {
  group: string;
}
const ResponsiveTable: React.FunctionComponent<IProps> = ({ group }) => {
  const pageSize = 25;
  const { data, updateOffset, offset, updateSearch, search, updateSort, sort } =
    useGroupLeaderboard(group, pageSize);
  const columns = [
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
      title: 'Name',
      prop: 'name',
      isSortable: false,
    },
    {
      title: 'Points',
      prop: 'ble_points',
      isSortable: true,
    },
    {
      title: 'ERC-20 Balance',
      prop: 'erc20_balance',

      isSortable: true,
    },
    {
      title: 'In-game Loomi',
      prop: 'reward',
      isSortable: true,
    },
    {
      title: 'Yield',
      prop: 'yield',
      isSortable: true,
    },
    // {
    //   title: 'Spent',
    //   prop: 'spent',
    //   isSortable: true,
    // },
    {
      title: 'Staked Creepz',
      prop: 'number_staked_creepz',
      isSortable: true,
    },
    {
      title: 'Staked Armouries',
      prop: 'number_staked_armouries',
      isSortable: true,
    },
    {
      title: 'Staked Vaults',
      isSortable: true,
      prop: 'number_staked_vaults',
    },
    {
      title: 'Megas',
      isSortable: true,
      prop: 'number_mega_shapeshifters',
    },
  ];

  return (
    <Table
      options={{
        sortOptions,
        columns,
        showSort: true,
        showSearch: true,
      }}
      dataName="wallets"
      data={data?.leaderboard?.players}
      updateOffset={updateOffset}
      offset={offset}
      updateSearch={updateSearch}
      search={search}
      updateSort={updateSort}
      sort={sort}
      pageSize={pageSize}
    />
  );
};

export default ResponsiveTable;
