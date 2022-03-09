import React from 'react';

import Modal from 'components/ui/Modal/Modal';

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  stakedIds: string[];
  unstakedIds?: string[];
  names: {
    id: string;
    name: string;
  }[];
  baseUrl: string;
  address: string;
}
const CreepzModal: React.FunctionComponent<IProps> = ({
  isOpen,
  handleClose,
  title,
  stakedIds,
  unstakedIds,
  names,
  baseUrl,
  address,
}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={title}>
      <div className="mt-2">
        <h3 className="text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
          Staked
        </h3>
        <ul
          role="list"
          className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {stakedIds.map((id) => (
            <li key={id} className="relative">
              <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                <a
                  href={`https://opensea.io/assets/${address}/${id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={baseUrl.replace('_||_', id)}
                    alt=""
                    className="object-cover pointer-events-none group-hover:opacity-75"
                  />
                </a>
              </div>
              <p className="mt-2 block text-sm font-medium text-creepz-green-light creepz-glowy-text truncate ">
                <a
                  href={`https://opensea.io/assets/${address}/${id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {names.find((creepName) => creepName.id === id)?.name ||
                    `#${id}`}
                </a>
              </p>
            </li>
          ))}
        </ul>
        {unstakedIds && unstakedIds.length > 0 && (
          <>
            <h3 className="mt-6 text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
              Unstaked
            </h3>
            <ul
              role="list"
              className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {unstakedIds.map((id) => (
                <li key={id} className="relative">
                  <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                    <a
                      href={`https://opensea.io/assets/${address}/${id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={baseUrl.replace('_||_', id)}
                        alt=""
                        className="object-cover pointer-events-none group-hover:opacity-75"
                      />
                    </a>
                  </div>
                  <p className="mt-2 block text-sm font-medium text-creepz-green-light creepz-glowy-text truncate ">
                    <a
                      href={`https://opensea.io/assets/${address}/${id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {names.find((creepName) => creepName.id === id)?.name ||
                        `#${id}`}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CreepzModal;
