import React from 'react';

import TokenList from 'components/TokenList/TokenList';
import Modal from 'components/ui/Modal/Modal';

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  stakedIds: string[];
  unstakedIds?: string[];
  stakeable?: boolean;
  baseUrl: string;
  address: string;
}
const TokenModal: React.FunctionComponent<IProps> = ({
  isOpen,
  handleClose,
  title,
  stakedIds,
  unstakedIds,
  stakeable,
  baseUrl,
  address,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={title}>
      <div className="mt-2">
        {stakeable && (
          <h3 className="text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
            Staked
          </h3>
        )}
        <TokenList tokenIds={stakedIds} baseUrl={baseUrl} address={address} />
        {stakeable && unstakedIds && unstakedIds.length > 0 && (
          <>
            <h3 className="mt-6 text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
              Unstaked
            </h3>

            <TokenList
              tokenIds={unstakedIds}
              baseUrl={baseUrl}
              address={address}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default TokenModal;
