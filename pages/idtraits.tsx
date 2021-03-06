import React, { useState } from 'react';

import { NextPage } from 'next';
import absoluteUrl from 'next-absolute-url';

import BlankHeader from 'components/BlankHeader/BlankHeader';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import TraitsDashboard from 'components/TraitsDashboard/TraitsDashboard';
import { Trait } from 'types';

type IProps = {
  traits: Record<string, Trait[]>;
};

const TraitsPage: NextPage<IProps> = ({ traits }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  return (
    <DashboardLayout
      isAddressModalOpen={isAddressModalOpen}
      setIsAddressModalOpen={setIsAddressModalOpen}
      header={
        <BlankHeader openAddressModel={() => setIsAddressModalOpen(true)} />
      }
    >
      <TraitsDashboard traitGroups={traits} />
    </DashboardLayout>
  );
};

export default TraitsPage;

TraitsPage.getInitialProps = async ({ req }) => {
  const { protocol, host } = absoluteUrl(req, 'localhost:3000');
  const response = await fetch(`${protocol}//${host}/api/traits`);
  const traits = await response.json();
  return {
    traits: traits.data,
  };
};
