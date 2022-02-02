import * as React from 'react';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { ChevronDownIcon } from '@heroicons/react/outline';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import LoadingSpinner from 'components/ui/LoadingSpinner/LoadingSpinner';

import Pagination from './Pagination';
import SearchSort from './SearchSort';

export type TableOptions = {
  showSort?: boolean;
  showSearch?: boolean;
  sortOptions: {
    display: string;
    prop: string;
  }[];
  columns: {
    title: string;
    prop: string;
    render?: (data: any, prop: string) => React.ReactNode;
    isSortable?: boolean;
  }[];
};

interface IProps {
  options: TableOptions;
  dataName?: string;
  data: any;
  updateOffset: (offset: number) => void;
  offset: number;
  updateSearch: (search: string) => void;
  search: string | undefined;
  updateSort: (sort: string) => void;
  sort: string;
  pageSize: number;
}
const ResponsiveTable: React.FunctionComponent<IProps> = ({
  options: { sortOptions, columns, showSort, showSearch },
  data,
  dataName,
  updateOffset,
  offset,
  updateSearch,
  search,
  updateSort,
  sort,
  pageSize,
}) => {
  return (
    <>
      <SearchSort
        showSort={showSort}
        showSearch={showSearch}
        sortOptions={sortOptions}
        addressSearch={search}
        updateAddressSearch={updateSearch}
        updateSort={updateSort}
        sort={sort}
      />
      <Pagination
        data={data}
        name={dataName}
        addressSearch={search}
        updateOffset={updateOffset}
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
                {column.isSortable && column.prop === sort && (
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
                <LoadingSpinner className="h-18 w-18" />
              </Td>
            </Tr>
          )}
          {data &&
            data.leaderboard &&
            data.leaderboard.players.map((player: any, idx: number) => (
              <Tr
                key={player.id}
                className={idx % 2 === 0 ? 'bg-white bg-opacity-5' : ''}
              >
                {columns.map((column) => (
                  <Td
                    key={column.prop}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-creepz-green-light"
                  >
                    {column.render
                      ? column.render(player, column.prop)
                      : player[column.prop]}
                  </Td>
                ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
      <div className="sm:flex sm:items-center sm:justify-between mt-2">
        <h3 className="text-sm text-creepz-green-light creepz-glowy-text"></h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {data && data.leaderboard && (
            <p className="text-sm text-creepz-green-light creepz-glowy-text">
              Last Updated{' '}
              {format(parseISO(data.leaderboard.game.date), 'MMM d yyyy pppp')}
            </p>
          )}
        </div>
      </div>
      <Pagination
        data={data}
        name={dataName}
        addressSearch={search}
        updateOffset={updateOffset}
        pageSize={pageSize}
        offset={offset}
      />
    </>
  );
};

export default ResponsiveTable;
