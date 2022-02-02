import * as React from 'react';

import { Menu } from '@headlessui/react';
import {
  SearchIcon,
  SortAscendingIcon,
  ChevronDownIcon,
  CheckIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';

interface IProps {
  showSort?: boolean;
  showSearch?: boolean;
  sortOptions: { display: string; prop: string }[];
  addressSearch?: string;
  updateAddressSearch: (addressSearch: string) => void;
  updateSort: (sort: string) => void;
  sort: string;
}
const SearchSort: React.FunctionComponent<IProps> = ({
  showSearch,
  showSort,
  sortOptions,
  addressSearch,
  updateAddressSearch,
  updateSort,
  sort,
}) => {
  if (!showSearch && !showSort) {
    return null;
  }
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <h3 className="text-sm text-creepz-green-light creepz-glowy-text"></h3>
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <label htmlFor="mobile-search-candidate" className="sr-only">
          Search
        </label>
        <label htmlFor="desktop-search-candidate" className="sr-only">
          Search
        </label>
        <div className="flex rounded-md shadow-sm">
          {showSearch && (
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-black" aria-hidden="true" />
              </div>
              <input
                type="search"
                value={addressSearch}
                onChange={(e) => updateAddressSearch(e.target.value)}
                name="mobile-search-address"
                id="mobile-search-address"
                className="bg-creepz-green-light creepz-glowy-shadow text-creepz-green-dark placeholder-creepz-green-dark placeholder-opacity-60 block w-full rounded-none py-0.5 pl-10 sm:hidden"
                placeholder="Search"
              />
              <input
                type="search"
                value={addressSearch}
                onChange={(e) => updateAddressSearch(e.target.value)}
                name="desktop-search-address"
                id="desktop-search-address"
                className="hidden bg-creepz-green-light creepz-glowy-shadow text-creepz-green-dark placeholder-creepz-green-dark placeholder-opacity-60 w-full rounded-none pl-10 py-1 sm:block sm:text-sm"
                placeholder="Search wallets"
              />
            </div>
          )}
          {showSort && (
            <Menu as="div" className="relative">
              <Menu.Button className="w-full bg-creepz-green-light creepz-glowy-shadow ml-1 px-4 py-1 inline-flex justify-center text-sm font-medium text-black focus:outline-none">
                <SortAscendingIcon
                  className="mr-3 h-5 w-5 text-black"
                  aria-hidden="true"
                />
                Sort
                <ChevronDownIcon
                  className="ml-2.5 -mr-1.5 h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Menu.Items className="text-left origin-top-right z-10 bg-black absolute right-0 w-56 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((sortOption) => (
                    <Menu.Item key={sortOption.prop}>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'underline' : '',
                            'block px-4 py-2 text-sm text-creepz-green-light'
                          )}
                          onClick={() => updateSort(sortOption.prop)}
                        >
                          {sortOption.display}
                          {sort === sortOption.prop && (
                            <CheckIcon className="inline-block ml-2 h-4 w-4" />
                          )}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSort;
