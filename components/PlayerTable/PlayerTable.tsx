import * as React from 'react';

import { shortenAddress } from '@usedapp/core';
import Link from 'next/link';

import Table from 'components/ui/Table/Table';
import useLeaderboard from 'hooks/useLeaderboard';

const sortOptions = [
  {
    display: 'ERC-20 Loomi',
    prop: 'erc20_balance',
  },
  {
    display: 'Loomi',
    prop: 'reward',
  },
  {
    display: 'Yield',
    prop: 'yield',
  },
  {
    display: 'Spent',
    prop: 'spent',
  },
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

interface IProps {}
const ResponsiveTable: React.FunctionComponent<IProps> = () => {
  const pageSize = 25;
  const { data, updateOffset, offset, updateSearch, search, updateSort, sort } =
    useLeaderboard(pageSize);
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
    {
      title: 'Spent',
      prop: 'spent',
      isSortable: true,
    },
    {
      title: 'Staked Creepz',
      prop: 'number_staked_creepz',
      isSortable: true,
    },
    {
      title: 'Staked Armouries',
      isSortable: true,
      prop: 'number_staked_armouries',
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
      data={data}
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
