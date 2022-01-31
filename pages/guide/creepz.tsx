import React, { useState } from 'react';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import GuideHeader from 'components/GuideHeader/GuideHeader';

const GuideCreepz: React.FunctionComponent = () => {
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
          Creepz
        </h1>
        <div className="mt-8 space-y-6">
          <p className="text-white text-base">
            Creepz are the original or genesis NFT in the game. Stake your
            creepz to earn $loomi.
          </p>
          <p className="text-white text-base">
            We&apos;re still working on this part of the guide. If you&apos;d
            like to contribute please reach out to us on Twitter{' '}
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

export default GuideCreepz;
