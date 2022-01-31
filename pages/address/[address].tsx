import React, { useState } from 'react';

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
};

const AddressPage: NextPage<IProps> = ({ address }) => {
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
  const address = ctx.query.address as string | undefined;
  return { address };
};

export default AddressPage;
