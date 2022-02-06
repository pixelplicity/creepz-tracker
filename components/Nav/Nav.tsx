import React from 'react';

import { Disclosure } from '@headlessui/react';
import {
  InformationCircleIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';

import UpdateWalletButton from 'components/ViewWalletButton/ViewWalletButton';

const extraNavigation = [
  { name: 'About', href: '/about' },
  {
    name: '@creepztracker',
    external: true,
    border: true,
    href: 'https://twitter.com/creepztracker_',
  },
];

interface IProps {
  openAddressModel: () => void;
}
const Nav: React.FunctionComponent<IProps> = ({ openAddressModel }) => {
  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <>
          <div className="relative max-w-7xl mx-auto px-4 sm:pr-2">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-creepz-green-light creepz-glowy-text hover:text-creepz-green  focus:outline-none ">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <p className="text-creepz-green-light font-cursive font-bold text-5xl md:ml-6 md:flex md:items-center md:space-x-4">
                    <Link href="/">
                      <a>
                        Creepz <span className="text-[#be80ff]">Tracker</span>
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  <Link href="/">
                    <a className="px-3 py-2 rounded-md text-sm font-medium text-creepz-green-light creepz-glowy-text hover:text-creepz-green">
                      Dashboard
                    </a>
                  </Link>
                  <Link href="/biglizardenergy">
                    <a className="px-3 py-2 rounded-md text-sm font-medium text-creepz-green-light creepz-glowy-text hover:text-creepz-green">
                      Big Lizard Energy
                    </a>
                  </Link>
                  <Link href="/guide">
                    <a className="px-3 py-2 rounded-md text-sm font-medium text-creepz-green-light creepz-glowy-text hover:text-creepz-green">
                      Guide
                    </a>
                  </Link>
                  <a
                    href="https://www.getrevue.co/profile/creepztracker"
                    target="_blank"
                    className="px-3 py-2 rounded-md text-sm font-medium text-creepz-green-light creepz-glowy-text hover:text-creepz-green"
                    rel="noreferrer"
                  >
                    Newsletter
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UpdateWalletButton openAddressModel={openAddressModel} />
                </div>
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <Link href="/about">
                    <a className="text-creepz-green-light focus:outline-none">
                      <span className="sr-only">About Creepz Tracker</span>
                      <InformationCircleIcon
                        className="h-8 w-8"
                        aria-hidden="true"
                      />
                    </a>
                  </Link>
                  <a
                    href="https://twitter.com/creepztracker_"
                    target="_blank"
                    className="ml-4 text-creepz-green-light focus:outline-none"
                    rel="noreferrer"
                  >
                    <span className="sr-only">@creepztracker_</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="twitter"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" passHref>
                <Disclosure.Button
                  as="a"
                  className="block px-3 py-2 text-creepz-green-light creepz-glowy-text hover:text-creepz-green"
                >
                  Dashboard
                </Disclosure.Button>
              </Link>
              <Link href="/biglizardenergy" passHref>
                <Disclosure.Button
                  as="a"
                  className="block px-3 py-2 text-creepz-green-light creepz-glowy-text hover:text-creepz-green"
                >
                  Big Lizard Energy
                </Disclosure.Button>
              </Link>
              <Link href="/guide" passHref>
                <Disclosure.Button
                  as="a"
                  className="block px-3 py-2 text-creepz-green-light creepz-glowy-text hover:text-creepz-green"
                >
                  Guide
                </Disclosure.Button>
              </Link>
              {extraNavigation.map((item) =>
                item.external ? (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    target="_blank"
                    className={`${
                      item.border ? 'border-t border-gray-700' : ''
                    } hover:cursor-pointer block px-3 py-2 text-creepz-green-light creepz-glowy-text hover:text-creepz-green`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : (
                  <Link key={item.name} href={item.href} passHref>
                    <Disclosure.Button
                      as="a"
                      className="hover:cursor-pointer block px-3 py-2 text-creepz-green-light creepz-glowy-text hover:text-creepz-green"
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
