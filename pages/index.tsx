import React, { useState } from 'react';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import GameDashboard from 'components/GameDashboard/GameDashboard';
import GameHeader from 'components/GameHeader/GameHeader';
import useFloorPrice from 'hooks/useFloorPrice';
import useLeaderboard from 'hooks/useLeaderboard';
import useLoomiPrice from 'hooks/useLoomiPrice';

const pageSize = 25;

const Home: React.FunctionComponent = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const { data: gameData, isLoading: gameLoading } = useLeaderboard(pageSize);
  const { data: loomiPrice, isLoading: loomiPriceLoading } = useLoomiPrice();
  const { data: floorPrices, isLoading: floorPriceLoading } = useFloorPrice();
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <GameHeader
          openAddressModel={() => setIsAddressModalOpen(true)}
          players={gameData?.leaderboard?.players.length || 0}
          loomiPrice={loomiPrice}
        />
      }
    >
      <GameDashboard
        gameData={gameData}
        gameLoading={gameLoading}
        loomiPrice={loomiPrice}
        loomiPriceLoading={loomiPriceLoading}
        floorPrices={floorPrices}
        floorPriceLoading={floorPriceLoading}
      />
    </DashboardLayout>
  );
};

export default Home;
