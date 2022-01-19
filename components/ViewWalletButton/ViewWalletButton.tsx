import * as React from 'react';

import Button from 'components/ui/Button/Button';

interface IProps {
  openAddressModel: () => void;
}
const ViewWalletButton: React.FunctionComponent<IProps> = ({
  openAddressModel,
}) => {
  return (
    <Button
      className="bg-creepz-green-light text-black w-full flex justify-center uppercase"
      onClick={openAddressModel}
    >
      View Wallet
    </Button>
  );
};

export default ViewWalletButton;
