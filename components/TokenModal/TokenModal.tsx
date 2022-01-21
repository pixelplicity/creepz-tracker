import React from 'react';

import { Transition, Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import GlowyBox from 'components/ui/GlowyBox/GlowyBox';

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  tokenIds: string[];
  baseUrl: string;
}
const TokenModal: React.FunctionComponent<IProps> = ({
  isOpen,
  handleClose,
  title,
  tokenIds,
  baseUrl,
}) => {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity pointer-events-none" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle text-left transform transition-all sm:max-w-2xl sm:w-full">
              <GlowyBox title={title}>
                <>
                  <div className="block absolute -top-10 -right-10 p-2 border border-creepz-border-dark rounded-xl bg-creepz-red creepz-glowy-red ">
                    <button
                      type="button"
                      className="bg-[#f2f4f8] bg-opacity-30 rounded-lg p-3 text-black focus:outline-none"
                      onClick={handleClose}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      <ul
                        role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                      >
                        {tokenIds.map((id) => (
                          <li key={id} className="relative">
                            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                              <a
                                href={baseUrl.replace('_||_', id)}
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
                            <p className="mt-2 block text-sm font-medium text-creepz-green-light creepz-glowy-text truncate pointer-events-none">
                              #{id}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              </GlowyBox>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TokenModal;