import React from 'react';

import AddressModal from 'components/AddressModal/AddressModal';
import SEO from 'components/SEO/SEO';

type IProps = {
  title?: string;
  description?: string;
  canonical?: string;
  header?: React.ReactNode;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (val: boolean) => void;
};

const Layout: React.FunctionComponent<IProps> = ({
  title,
  description,
  canonical,
  header,
  isAddressModalOpen,
  setIsAddressModalOpen,
  children,
}) => {
  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <div className="relative overflow-hidden">
        {header && header}
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
