import React, { useState } from 'react';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import GameHeader from 'components/GameHeader/GameHeader';
import useLeaderboard from 'hooks/useLeaderboard';
import useLoomiPrice from 'hooks/useLoomiPrice';

const Home: React.FunctionComponent = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const { data: gameData } = useLeaderboard(25);
  const { data: loomiPrice } = useLoomiPrice();
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
      <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 mt-8">
        <h1 className="text-7xl font-cursive text-center text-white uppercase">
          About Creepz Tracker
        </h1>
        <div className="mt-8 space-y-6">
          <p className="text-white text-base">
            Creepz Tracker is a community run project to track statistics and
            transactions for the{' '}
            <a
              className="underline"
              href="https://www.creepz.co/"
              target="_blank"
              rel="noreferrer"
            >
              Cold Blooded Creepz
            </a>{' '}
            DeFi game. It is not affiliated with Cold Blooded Creepz.
          </p>
          <p className="text-white text-base">
            <strong className="text-3xl font-bold block pb-1">
              How does Creepz Tracker Work?
            </strong>
            Creepz Tracker is a completely free dashboard that shows the state
            of any wallet in the game and some interesting game world
            statistics. We wanted to bring all the information you&apos;d
            usually hunt for across multiple sites into one place.
          </p>
          <p className="text-white text-base">
            <strong className="text-3xl font-bold block pb-1">
              Is Creep Tracker Safe?
            </strong>
            You do not need to connect your wallet or sign any messages to use
            Creepz Tracker. This tool only reads data from varous sources. You
            cannot create any transactions using Creepz Tracker.
          </p>
          <p className="text-white text-base">
            <strong className="text-3xl font-bold block pb-1">
              How are these numbers calculated?
            </strong>
            A combination of querying the various game contracts and using other
            open APIs.
          </p>
          <p className="text-white text-base">
            <strong className="text-3xl font-bold block pb-1">
              Why are some of the numbers off?
            </strong>
            While every effort is made to ensure the numbers are correct,
            limitations on data provider APIs and irregular player activity may
            result in inaccurate numbers. Creepz Tracker should not be used as a
            source of truth.
          </p>
          <p className="text-white text-base">
            <strong className="text-2xl font-bold block pb-1">
              How can I contribute?
            </strong>
            DM us on Twitter{' '}
            <a
              className="underline"
              href="https://twitter.com/creepztracker_"
              target="_blank"
              rel="noreferrer"
            >
              @creepztracker_
            </a>
            . We&apos;re always looking for suggestions for new features, help
            building those features or just testing. You can also send any Loomi
            donations to 0x167D9E9734F5220dB5f59288A0dD45C765F8698c
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
