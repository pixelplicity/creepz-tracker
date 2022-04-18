import React from 'react';

import Nav from 'components/Nav/Nav';
import SwappableText from 'components/ui/SwappableText/SwappableText';

interface IProps {
  address?: string;
  openAddressModel: () => void;
  players: number;
  loomiPrice: any;
}
const GameHeader: React.FunctionComponent<IProps> = ({
  openAddressModel,
  players,
  loomiPrice,
}) => {
  return (
    <>
      <Nav openAddressModel={openAddressModel} />
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
          <div className="lg:flex lg:items-center lg:justify-between py-16">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-normal leading-7 text-creepz-blue sm:text-3xl creepz-glowy-text">
                $loomi{' '}
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
              </h2>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6 border border-top-1 border-b-0 border-x-0 border-creepz-blue">
                <div className="mt-2 flex items-center text-md text-creepz-blue creepz-glowy-text">
                  {players} active players
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameHeader;
