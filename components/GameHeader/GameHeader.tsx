import React from 'react';

import { InformationCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';

import LoadingText from 'components/ui/LoadingText/LoadingText';
import SwappableText from 'components/ui/SwappableText/SwappableText';
import UpdateWalletButton from 'components/ViewWalletButton/ViewWalletButton';
import useGameStats from 'hooks/useGameStats';

interface IProps {
  address?: string;
  openAddressModel: () => void;
}
const GameHeader: React.FunctionComponent<IProps> = ({ openAddressModel }) => {
  const { loomiPrice, gameData, isLoading } = useGameStats();
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="/images/header-bg.png"
          alt="Creepz Invasion Grounds"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center items-stretch justify-start">
            <div className="flex-shrink-0 flex items-center">
              <p className="text-creepz-green-light font-cursive font-bold text-5xl ">
                <Link href="/">
                  <a>
                    Creepz <span className="text-[#be80ff]">Tracker</span>
                  </a>
                </Link>
              </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <UpdateWalletButton openAddressModel={openAddressModel} />
              </div>
            </div>
            <Link href="/about">
              <a className="text-creepz-green-light focus:outline-none">
                <span className="sr-only">About Creepz Tracker</span>
                <InformationCircleIcon className="h-8 w-8" aria-hidden="true" />
              </a>
            </Link>
            <a
              href="https://twitter.com/creepztracker_"
              target="_blank"
              className="ml-1 text-creepz-green-light focus:outline-none"
              rel="noreferrer"
            >
              <span className="sr-only">@creepztracker_</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="twitter"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="lg:flex lg:items-center lg:justify-between mt-16 pb-16">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-creepz-green-light sm:text-3xl creepz-glowy-text">
              $loomi{' '}
              <LoadingText isLoading={isLoading}>
                <SwappableText>
                  {(swapped: boolean) =>
                    swapped ? (
                      <span>{loomiPrice.eth.toFixed(8)}</span>
                    ) : (
                      Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(loomiPrice.usd)
                    )
                  }
                </SwappableText>
              </LoadingText>
            </h2>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6 border border-top-1 border-b-0 border-x-0 border-creepz-green">
              <div className="mt-2 flex items-center text-md text-creepz-green-light creepz-glowy-text">
                <LoadingText
                  isLoading={isLoading && !gameData?.leaderboard?.game?.players}
                >
                  <span>
                    {gameData?.leaderboard?.game?.players} active players
                  </span>
                </LoadingText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
