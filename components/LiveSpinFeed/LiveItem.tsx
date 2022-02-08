import * as React from 'react';

import { shortenAddress } from '@usedapp/core';
import formatRelative from 'date-fns/formatRelative';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';

interface IProps {
  item: any;
  index: number;
}
const LiveItem: React.FunctionComponent<IProps> = ({ item, index }) => {
  return (
    <li
      className={`${
        index % 2 === 0 ? 'bg-white bg-opacity-5' : ''
      } p-5 transition-opacity duration-1000 ease-in`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-creepz-green-light">
            {item.amount} {item.amount === 1 ? item.action : `${item.action}s`}
          </p>
          <p className="text-sm font-medium text-creepz-green-light">
            <Link href={`/address/${item.address}`}>
              <a target="_blank" className="underline">
                {item.nickname ||
                  (item.address && shortenAddress(item.address))}
              </a>
            </Link>
          </p>
          <p className="text-sm font-medium text-creepz-green">
            {formatRelative(parseISO(item.date), new Date())}
          </p>
        </div>
        <div>
          <a
            href={`https://etherscan.io/tx/${item.hash}`}
            target="_blank"
            className="bg-creepz-green-light text-black w-full flex justify-center uppercase inline-flex items-center py-2 px-4 text-sm leading-4 font-medium focus:outline-none"
            rel="noreferrer"
          >
            View
          </a>
        </div>
      </div>
    </li>
  );
};

export default LiveItem;
