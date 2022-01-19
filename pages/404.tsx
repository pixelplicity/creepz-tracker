import React, { useState } from 'react';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';

const Home: React.FunctionComponent = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
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
                404 - Not Found
              </h1>
            </div>
          </main>
        </div>
      </>
    </DashboardLayout>
  );
};

export default Home;
