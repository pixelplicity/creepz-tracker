import React, { useState } from 'react';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import GuideHeader from 'components/GuideHeader/GuideHeader';

const GuideHome: React.FunctionComponent = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <GuideHeader openAddressModel={() => setIsAddressModalOpen(true)} />
      }
    >
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 mt-8">
        <h1 className="text-7xl font-cursive text-center text-white uppercase">
          Cold Blooded Creepz
        </h1>
        <div className="mt-8 space-y-6">
          <p className="text-white text-base">
            Welcome to{' '}
            <a
              className="underline"
              href="https://www.creepz.co/"
              target="_blank"
              rel="noreferrer"
            >
              Cold Blooded Creepz
            </a>{' '}
            (CBC) unofficial community guide. CBC is an exciting NFT P2E game.
            This guide to the game is written by members of the Creepz
            community. This is not an official source of information. While we
            try to stay on top of changes in the game, the Creepz team moves
            fast and is always surprising us so we may lag behind.{' '}
            <span className="font-bold">
              This is not financial advice, please do your own research.
            </span>
          </p>
          <p className="text-white text-base">
            We&apos;re just getting started with our guide. If you&apos;d like
            to contribute please reach out to us on Twitter{' '}
            <a
              className="underline"
              href="https://twitter.com/creepztracker_"
              target="_blank"
              rel="noreferrer"
            >
              @creepztracker_
            </a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuideHome;
