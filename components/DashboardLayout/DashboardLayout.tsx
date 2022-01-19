import React from 'react';

import AddressModal from 'components/AddressModal/AddressModal';
import DashboardHeader from 'components/DashboardHeader/DashboardHeader';
import SEO from 'components/SEO/SEO';

type IProps = {
  title?: string;
  description?: string;
  canonical?: string;
  address?: string;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (val: boolean) => void;
};

const Layout: React.FunctionComponent<IProps> = ({
  title,
  description,
  canonical,
  address,
  isAddressModalOpen,
  setIsAddressModalOpen,
  children,
}) => {
  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <div className="relative overflow-hidden">
        <DashboardHeader
          address={address}
          openAddressModel={() => setIsAddressModalOpen(true)}
        />
        <main className="min-h-full relative max-w-7xl mx-auto pb-24">
          {children}
        </main>
      </div>
      <AddressModal
        isOpen={isAddressModalOpen}
        handleClose={() => setIsAddressModalOpen(false)}
      />
    </>
  );
};

export default Layout;
