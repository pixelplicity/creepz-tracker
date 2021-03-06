import React, { useState } from 'react';

import { NextPage } from 'next';

import BlankHeader from 'components/BlankHeader/BlankHeader';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import IDBuilder from 'components/IDBuilder/IDBuilder';

type IProps = {
  group?: string;
};

const TraitsPage: NextPage<IProps> = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <BlankHeader openAddressModel={() => setIsAddressModalOpen(true)} />
      }
    >
      <IDBuilder />
    </DashboardLayout>
  );
};

export default TraitsPage;
