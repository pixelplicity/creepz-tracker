import React from 'react';

import Modal from 'components/ui/Modal/Modal';

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
}
const PlayerTableModal: React.FunctionComponent<IProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title="About the Leaderboard"
    >
      <div className="mt-2">
        <p className="text-creepz-green-light creepz-glowy-text mt-3">
          The game leaderboard is updated daily and is a best effort attempt at
          gathering stats from all active players. It should not be used as a
          source of truth.
        </p>
        <p className="text-creepz-green-light creepz-glowy-text mt-3">
          Only addresses that have units staked in the game appear in the
          leaderboard. This means it is missing a lot of addresses that were
          used just to spend loomi or addresses that have exited the game but
          did earn, yield, and/or spend.
        </p>
      </div>
    </Modal>
  );
};

export default PlayerTableModal;
