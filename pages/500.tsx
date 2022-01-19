import React, { useState } from 'react';

import { NextPage } from 'next';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';

type IProps = {
  statusCode?: string;
};

const GeneralError: NextPage<IProps> = ({ statusCode }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
    >
      <>
        <div className="py-10">
          <main>
            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
              <h1 className="text-7xl font-cursive text-center text-white uppercase">
                {statusCode} - Error
              </h1>
            </div>
          </main>
        </div>
      </>
    </DashboardLayout>
  );
};

export async function getStaticProps(ctx: any): Promise<{ props: IProps }> {
  console.log('CONTEXT', ctx);
  return {
    props: {
      statusCode: '500',
    },
  };
}

export default GeneralError;
