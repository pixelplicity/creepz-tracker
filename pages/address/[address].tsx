import React, { useState } from 'react';

import { NextPage } from 'next';

import AddressDashboard from 'components/AddressDashboard/AddressDashboard';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import InvalidAddress from 'components/InvalidAddress/InvalidAddress';
import { isValidAddress } from 'services/web3';

type IProps = {
  address?: string;
};

const AddressPage: NextPage<IProps> = ({ address }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const isAddressValid = isValidAddress(address);
  return (
    <DashboardLayout
      address={address}
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
    >
      {isAddressValid && <AddressDashboard address={address as string} />}
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
