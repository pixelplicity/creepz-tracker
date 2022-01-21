import React from 'react';

import { Transition, Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import GlowyBox from 'components/ui/GlowyBox/GlowyBox';

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  userReward: number;
  userYield: number;
  price: {
    usd: number;
    eth: number;
  };
}
const LamboModal: React.FunctionComponent<IProps> = ({
  isOpen,
  handleClose,
  title,
  price,
  userYield,
  userReward,
}) => {
  const lamboCostUSD = 260000;
  const currentUSDBalance = userReward * price.usd;
  const remainingUSD = lamboCostUSD - currentUSDBalance;
  const percentage = ((lamboCostUSD - remainingUSD) / lamboCostUSD) * 100;
  const daysToLambo = remainingUSD / (userYield * price.usd);
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
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text"
                    >
                      {daysToLambo < 0 ? 'Now!' : Math.ceil(daysToLambo)} days
                    </Dialog.Title>
                    <div className="mt-4">
                      {daysToLambo < 0 && (
                        <p className="text-creepz-green-light creepz-glowy-text">
                          You&apos;re already there! Go get that Lambo!
                        </p>
                      )}
                      {daysToLambo >= 0 && (
                        <>
                          <p className="text-creepz-green-light creepz-glowy-text">
                            At a price of{' '}
                            {Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(price.usd)}{' '}
                            per Loomi, you have{' '}
                            {Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(+userReward * price.usd)}
                            . You are {percentage.toFixed(2)}% of the way to
                            your Lambo. That&apos;s {Math.ceil(daysToLambo)}{' '}
                            days from now!
                          </p>
                        </>
                      )}
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

export default LamboModal;
