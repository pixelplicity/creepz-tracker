import React, { useState } from 'react';

import { NextPage } from 'next';
import { Provider } from 'react-supabase';

import BlankHeader from 'components/BlankHeader/BlankHeader';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import LiveDashboard from 'components/LiveSpinFeed/LiveSpinFeed';
import supabase from 'services/supabase/client';

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
      <Provider value={supabase}>
        <LiveDashboard />
      </Provider>
    </DashboardLayout>
  );
};

export default GroupPage;
