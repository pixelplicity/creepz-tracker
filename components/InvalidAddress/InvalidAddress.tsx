import React from 'react';

import UpdateWalletButton from 'components/ViewWalletButton/ViewWalletButton';

interface IProps {
  openAddressModel: () => void;
}
const InvalidAddress: React.FunctionComponent<IProps> = ({
  openAddressModel,
}) => {
  return (
    <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 mt-8">
      <h1 className="text-7xl font-cursive text-center text-white uppercase">
        Invalid Wallet Address
      </h1>
      <div className="mt-8 space-y-4">
        <p className="text-center text-white text-lg">
          Enter a valid wallet address to continue.
        </p>
        <div className="w-1/2 mx-auto">
          <UpdateWalletButton openAddressModel={openAddressModel} />
        </div>
      </div>
    </div>
  );
};

export default InvalidAddress;
