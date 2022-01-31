import React, { useState } from 'react';

import { NextPage } from 'next';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';

type IProps = {
  group?: string;
};

const GroupPage: NextPage<IProps> = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  // const { data: groupData, isLoading: groupLoading } = useGroupLeaderboard(
  //   group,
  //   25
  // );
  // const { data: loomiPrice, isLoading: loomiPriceLoading } = useLoomiPrice();
  // const { data: floorPrices, isLoading: floorPriceLoading } = useFloorPrice();
  // return (
  //   <DashboardLayout
  //     isAddressModalOpen={isAddressModalOpen}
  //     setIsAddressModalOpen={setIsAddressModalOpen}
  //     header={
  //       <GameHeader
  //         openAddressModel={() => setIsAddressModalOpen(true)}
  //         players={groupData?.leaderboard?.group?.players || 0}
  //         loomiPrice={loomiPrice}
  //       />
  //     }
  //   >
  //     <GroupDashboard
  //       groupData={groupData}
  //       groupLoading={groupLoading}
  //       loomiPrice={loomiPrice}
  //       loomiPriceLoading={loomiPriceLoading}
  //       floorPrices={floorPrices}
  //       floorPriceLoading={floorPriceLoading}
  //     />
  //   </DashboardLayout>
  // );
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
    >
      <>
        <div className="py-10">
          <header></header>
          <main>
            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
              <h1 className="text-7xl font-cursive text-center text-white uppercase">
                Down for maintenance, groups will be back later today better
                than ever! 🦎
              </h1>
            </div>
          </main>
        </div>
      </>
    </DashboardLayout>
  );
};

GroupPage.getInitialProps = async (ctx): Promise<IProps> => {
  const group = ctx.query.group as string | undefined;
  return { group };
};

export default GroupPage;
