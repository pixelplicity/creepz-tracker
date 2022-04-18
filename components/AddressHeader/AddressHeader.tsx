import React, { useEffect } from 'react';

import Nav from 'components/Nav/Nav';
import SwappableText from 'components/ui/SwappableText/SwappableText';
import { isValidAddress } from 'services/web3';

interface IProps {
  address?: string;
  ens?: string;
  openAddressModel: () => void;
  walletData: any;
  walletLoading: boolean;
  loomiPrice: any;
  loomiPriceLoading: boolean;
  floorPrices: any;
  floorPriceLoading: boolean;
}
const AddressHeader: React.FunctionComponent<IProps> = ({
  address,
  ens,
  openAddressModel,
  walletData,
  walletLoading,
  loomiPrice,
  loomiPriceLoading,
  floorPrices,
  floorPriceLoading,
}) => {
  const addressIsValid = isValidAddress(address);
  const [walletValue, setWalletValue] = React.useState(0);
  useEffect(() => {
    if (!walletLoading && !floorPriceLoading && !loomiPriceLoading) {
      let value = 0;
      const totalCreepz =
        walletData.creeps.staked.length + walletData.creeps.unstaked.length;
      const totalArmouries =
        walletData.armouries.staked.length +
        walletData.armouries.unstaked.length;
      const totalVaults =
        walletData.vaults.staked.length + walletData.vaults.unstaked.length;
      if (totalCreepz && floorPrices.creepz) {
        value += totalCreepz * floorPrices.creepz;
      }
      if (totalArmouries && floorPrices.armoury) {
        value += totalArmouries * floorPrices.armoury;
      }
      if (totalVaults && floorPrices.vault) {
        value += totalVaults * floorPrices.vault;
      }
      if (walletData.shapeshifters && floorPrices.armoury) {
        value += walletData.shapeshifters.length * floorPrices.shapeshifter;
      }
      if (walletData.megaShapeshifters && floorPrices.megaShapeshifter) {
        value +=
          walletData.megaShapeshifters.length * floorPrices.megaShapeshifter;
      }
      if (
        walletData.userReward &&
        walletData.userBalance &&
        walletData.taxClaimable &&
        walletData.vaultReward &&
        loomiPrice.eth
      ) {
        value +=
          ((walletData.userReward +
            +walletData.taxClaimable +
            walletData.vaultReward) *
            0.75 +
            walletData.userBalance) *
          loomiPrice.eth;
      }
      setWalletValue(value);
    }
  }, [
    addressIsValid,
    walletLoading,
    floorPriceLoading,
    loomiPriceLoading,
    walletData,
    floorPrices,
    loomiPrice,
  ]);

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
          {address && (
            <div className="lg:flex lg:items-center lg:justify-between py-16 pb-24">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-normal leading-7 text-creepz-blue sm:text-3xl creepz-glowy-text">
                  <SwappableText>
                    {(swapped: boolean) =>
                      swapped ? (
                        <span>{walletValue.toFixed(2)} wallet value</span>
                      ) : (
                        <span>
                          {walletData && walletData.userReward} $loomi
                        </span>
                      )
                    }
                  </SwappableText>
                </h2>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6 border border-top-1 border-b-0 border-x-0 border-creepz-blue">
                  <div className="mt-2 flex items-center text-md text-creepz-blue creepz-glowy-text">
                    <SwappableText>
                      {(swapped: boolean) =>
                        swapped ? (
                          <span>
                            {addressIsValid ? address : 'Invalid address'}
                          </span>
                        ) : (
                          <span>
                            {addressIsValid
                              ? walletData.nickname || ens || address
                              : 'Invalid address'}
                          </span>
                        )
                      }
                    </SwappableText>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressHeader;
