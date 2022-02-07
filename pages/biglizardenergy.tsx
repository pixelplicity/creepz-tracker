import React, { useState } from 'react';

import { NextPage } from 'next';

import BlankHeader from 'components/BlankHeader/BlankHeader';
import BLEDashboard from 'components/BLEDashboard/BLEDashboard';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';

type IProps = {
  group?: string;
};

const GroupPage: NextPage<IProps> = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <BlankHeader openAddressModel={() => setIsAddressModalOpen(true)} />
      }
    >
      <BLEDashboard />
    </DashboardLayout>
  );
};

export default GroupPage;
