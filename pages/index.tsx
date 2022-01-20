import React, { useState } from 'react';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import UpdateWalletButton from 'components/ViewWalletButton/ViewWalletButton';

const Home: React.FunctionComponent = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
    >
      <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 mt-8">
        <h1 className="text-7xl font-cursive text-center text-white uppercase">
          this is Creepz invasion HQ
        </h1>
        <div className="mt-8 space-y-4">
          <p className="text-center text-white text-lg">
            View the state of any wallet in the game or the game as a whole.
            Deep dive into Creepz, Armory, and Shapeshifter supplies,
            transactions, and more.
          </p>
          <p className="text-center text-white text-base">
            For now, you can look up any wallet address by clicking the button
            below.
          </p>
          <div className="w-1/2 mx-auto">
            <UpdateWalletButton
              openAddressModel={() => setIsAddressModalOpen(true)}
            />
          </div>
          <p className="text-center text-white text-base">
            We&apos;re just getting started. If you have a feature request or
            want to help in someway please reach out to us on Twitter at{' '}
            <a
              className="underline"
              href="https://twitter.com/creepztracker_"
              target="_blank"
              rel="noreferrer"
            >
              @creepztracker_
            </a>
            .
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
