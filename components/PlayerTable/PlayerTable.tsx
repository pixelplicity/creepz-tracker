import * as React from 'react';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { ChevronDownIcon } from '@heroicons/react/outline';
import { shortenAddress } from '@usedapp/core';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import useSWR from 'swr';

import LoadingText from 'components/ui/LoadingText/LoadingText';
import type { Player } from 'types';

import Pagination from './Pagination';
import SearchSort from './SearchSort';

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

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
];

interface IProps {
  pageSize?: number;
  group?: string;
}
const ResponsiveTable: React.FunctionComponent<IProps> = ({
  pageSize = 25,
  group,
}) => {
  const [sort, setSort] = React.useState<string>('reward');
  const [addressSearch, setAddressSearch] = React.useState<string>();
  const [offset, setOffset] = React.useState<number>(0);
  const { data } = useSWR(
    `/api/leaderboard?offset=${offset}&limit=${pageSize}&sort=${sort}${
      addressSearch && addressSearch !== '' && addressSearch.length >= 3
        ? `&search=${addressSearch}`
        : ''
    }${group ? `&group=${group}` : ''}`,
    fetcher
  );

  const columns = [
    {
      title: 'Wallet',
      isSortable: false,
      isSorted: false,
    },
    {
      title: 'ERC-20 Balance',
      isSortable: true,
      isSorted: sort === 'erc20_balance',
    },
    {
      title: 'In-game Loomi',
      isSortable: true,
      isSorted: sort === 'reward',
    },
    {
      title: 'Yield',
      isSortable: true,
      isSorted: sort === 'yield',
    },
    {
      title: 'Spent',
      isSortable: true,
      isSorted: sort === 'spent',
    },
    {
      title: 'Staked Creepz',
      isSortable: true,
      isSorted: sort === 'number_staked_creepz',
    },
    {
      title: 'Staked Armouries',
      isSortable: true,
      isSorted: sort === 'number_staked_armouries',
    },
  ];

  if (group) {
    columns.splice(1, 0, {
      title: 'Name',
      isSortable: false,
      isSorted: false,
    });
  }
  return (
    <>
      <SearchSort
        sortOptions={sortOptions}
        addressSearch={addressSearch}
        updateAddressSearch={setAddressSearch}
        updateSort={setSort}
        sort={sort}
      />
      <Pagination
        data={data}
        addressSearch={addressSearch}
        updateOffset={setOffset}
        pageSize={pageSize}
        offset={offset}
      />
      <Table className="w-full">
        <Thead className="border border-creepz-green-light">
          <Tr>
            {columns.map((column, idx) => (
              <Th
                key={idx}
                scope="col"
                className="px-6 py-3 text-center text-sm font-medium text-creepz-green-light creepz-glowy-text"
              >
                {column.title}{' '}
                {column.isSortable && column.isSorted && (
                  <ChevronDownIcon
                    className="h-3 w-3 text-creepz-green-light creepz-glowy-text inline-block"
                    aria-hidden="true"
                  />
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {!data && (
            <Tr>
              <Td
                colSpan="7"
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-creepz-green-light"
              >
                Loading...
              </Td>
            </Tr>
          )}
          {data &&
            data.leaderboard.players.map((player: Player, idx: number) => (
              <Tr
                key={player.id}
                className={idx % 2 === 0 ? 'bg-white bg-opacity-5' : ''}
              >
                <Td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-creepz-green-light">
                  <Link href={`/address/${player.wallet_address}`}>
                    <a className="underline">
                      {shortenAddress(player.wallet_address)}
                    </a>
                  </Link>
                </Td>
                {group && (
                  <Td className="px-6 py-4 whitespace-nowrap text-md text-creepz-green-light">
                    {player.name}
                  </Td>
                )}
                <Td className="px-6 py-4 whitespace-nowrap text-md text-creepz-green-light">
                  {player.erc20_balance}
                </Td>
                <Td className="px-6 py-4 whitespace-nowrap text-md text-creepz-green-light">
                  {player.reward}
                </Td>
                <Td className="px-6 py-4 whitespace-nowrap text-md text-creepz-green-light">
                  {player.yield}
                </Td>
                <Td className="px-6 py-4 whitespace-nowrap text-md text-creepz-green-light">
                  {player.spent}
                </Td>
                <Td className="px-6 py-4 whitespace-nowrap text-md text-creepz-green-light">
                  {player.number_staked_creepz}
                </Td>
                <Td className="px-6 py-4 whitespace-nowrap text-md text-creepz-green-light">
                  {player.number_staked_armouries}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <div className="sm:flex sm:items-center sm:justify-between mt-2">
        <h3 className="text-sm text-creepz-green-light creepz-glowy-text"></h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <LoadingText isLoading={!data}>
            {data && (
              <p className="text-sm text-creepz-green-light creepz-glowy-text">
                Last Updated{' '}
                {format(
                  parseISO(data.leaderboard.game.date),
                  'MMM d yyyy pppp'
                )}
              </p>
            )}
          </LoadingText>
        </div>
      </div>
      <Pagination
        data={data}
        addressSearch={addressSearch}
        updateOffset={setOffset}
        pageSize={pageSize}
        offset={offset}
      />
    </>
  );
};

export default ResponsiveTable;
