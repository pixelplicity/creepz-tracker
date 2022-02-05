import React, { useState } from 'react';

import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { NextPage } from 'next';

import AddressDashboard from 'components/AddressDashboard/AddressDashboard';
import AddressHeader from 'components/AddressHeader/AddressHeader';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import InvalidAddress from 'components/InvalidAddress/InvalidAddress';
import useFloorPrice from 'hooks/useFloorPrice';
import useLoomiPrice from 'hooks/useLoomiPrice';
import useWalletStats from 'hooks/useWalletStats';
import { isValidAddress } from 'services/web3';

type IProps = {
  address?: string;
  ens?: string;
};

const AddressPage: NextPage<IProps> = ({ address, ens }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const isAddressValid = isValidAddress(address);
  const { data: walletData, isLoading: walletLoading } =
    useWalletStats(address);
  const { data: loomiPrice, isLoading: loomiPriceLoading } = useLoomiPrice();
  const { data: floorPrices, isLoading: floorPriceLoading } = useFloorPrice();
  return (
    <DashboardLayout
      header={
        <AddressHeader
          address={address}
          ens={ens}
          walletData={walletData}
          walletLoading={walletLoading}
          loomiPrice={loomiPrice}
          loomiPriceLoading={loomiPriceLoading}
          floorPrices={floorPrices}
          floorPriceLoading={floorPriceLoading}
          openAddressModel={() => setIsAddressModalOpen(true)}
        />
      }
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
    >
      {isAddressValid && (
        <AddressDashboard
          address={address as string}
          walletData={walletData}
          walletLoading={walletLoading}
          loomiPrice={loomiPrice}
          loomiPriceLoading={loomiPriceLoading}
          floorPrices={floorPrices}
          floorPriceLoading={floorPriceLoading}
        />
      )}
      {!isAddressValid && (
        <InvalidAddress openAddressModel={() => setIsAddressModalOpen(true)} />
      )}
    </DashboardLayout>
  );
};

AddressPage.getInitialProps = async (ctx): Promise<IProps> => {
  const rawAddress = ctx.query.address as string | undefined;
  const web3 = createAlchemyWeb3(
    process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT
  );
  let address = rawAddress;
  if (rawAddress && rawAddress.indexOf('0x') !== 0) {
    address = await web3.eth.ens.getAddress(rawAddress);
  }

  return { address, ens: address !== rawAddress ? rawAddress : undefined };
};

export default AddressPage;
