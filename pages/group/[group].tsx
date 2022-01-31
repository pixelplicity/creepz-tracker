import React, { useState } from 'react';

import { NextPage } from 'next';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import GameHeader from 'components/GameHeader/GameHeader';
import GroupDashboard from 'components/GroupDashboard/GroupDashboard';
import useFloorPrice from 'hooks/useFloorPrice';
import useGroupLeaderboard from 'hooks/useGroupLeaderboard';
import useLoomiPrice from 'hooks/useLoomiPrice';

type IProps = {
  group?: string;
};

const GroupPage: NextPage<IProps> = ({ group }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const { data: groupData, isLoading: groupLoading } = useGroupLeaderboard(
    group,
    25
  );
  const { data: loomiPrice, isLoading: loomiPriceLoading } = useLoomiPrice();
  const { data: floorPrices, isLoading: floorPriceLoading } = useFloorPrice();
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <GameHeader
          openAddressModel={() => setIsAddressModalOpen(true)}
          players={groupData?.leaderboard?.game?.players || 0}
          loomiPrice={loomiPrice}
        />
      }
    >
      <GroupDashboard
        group={group}
        groupData={groupData}
        groupLoading={groupLoading}
        loomiPrice={loomiPrice}
        loomiPriceLoading={loomiPriceLoading}
        floorPrices={floorPrices}
        floorPriceLoading={floorPriceLoading}
      />
    </DashboardLayout>
  );
};

GroupPage.getInitialProps = async (ctx): Promise<IProps> => {
  const group = ctx.query.group as string | undefined;
  return { group };
};

export default GroupPage;
