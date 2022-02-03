import React from 'react';

import TokenList from 'components/TokenList/TokenList';
import Modal from 'components/ui/Modal/Modal';
import StatBox from 'components/ui/StatBox/StatBox';
import { address as shapeshifterAddress } from 'contracts/Vaults/Vaults';

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  vaultIds: string[];
  accumulation: number;
  priceChange: number;
  reward: number;
}
const VaultModal: React.FunctionComponent<IProps> = ({
  isOpen,
  handleClose,
  title,
  vaultIds,
  accumulation,
  priceChange,
  reward,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={title}>
      <div className="mt-2">
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-3">
          <StatBox label="Accumulated">{accumulation}</StatBox>
          <StatBox label="Fluctuation %">{priceChange}%</StatBox>
          <StatBox label="Claim">{reward}</StatBox>
        </div>
        <div className="mt-6">
          <h3 className="text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
            Staked Vaults
          </h3>
          <TokenList
            tokenIds={vaultIds}
            baseUrl="https://www.creepz.co/static/media/vaultCompressed.0b18f535.gif"
            address={shapeshifterAddress}
          />
        </div>
      </div>
    </Modal>
  );
};

export default VaultModal;
