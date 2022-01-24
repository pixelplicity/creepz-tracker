import React, { useState } from 'react';

import { NextPage } from 'next';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import GameDashboard from 'components/GameDashboard/GameDashboard';
import GameHeader from 'components/GameHeader/GameHeader';

type IProps = {
  group?: string;
};

const GroupPage: NextPage<IProps> = ({ group }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <GameHeader openAddressModel={() => setIsAddressModalOpen(true)} />
      }
    >
      <GameDashboard group={group} />
    </DashboardLayout>
  );
};

GroupPage.getInitialProps = async (ctx): Promise<IProps> => {
  const group = ctx.query.group as string | undefined;
  return { group };
};

export default GroupPage;
