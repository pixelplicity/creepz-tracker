import React, { useState } from 'react';

import { NextPage } from 'next';

import BLEDashboard from 'components/BLEDashboard/BLEDashboard';
import BLEHeader from 'components/BLEHeader/BLEHeader';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import useBLEStats from 'hooks/useBLEStats';

type IProps = {
  group?: string;
};

const GroupPage: NextPage<IProps> = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const { data: bleData } = useBLEStats();
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <BLEHeader
          openAddressModel={() => setIsAddressModalOpen(true)}
          bleData={bleData}
        />
      }
    >
      <BLEDashboard />
    </DashboardLayout>
  );
};

export default GroupPage;
