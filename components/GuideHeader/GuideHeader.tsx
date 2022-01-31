import React from 'react';

import { useRouter } from 'next/router';

import Nav from 'components/Nav/Nav';

interface IProps {
  address?: string;
  openAddressModel: () => void;
}

const tabs = [
  { name: 'Intro', href: '/guide' },
  // { name: 'Creepz', href: '/guide/creepz' },
  // { name: 'Armouries', href: '/guide/armouries' },
  // { name: 'Loomi Vaults', href: '/guide/vaults' },
  // { name: 'Shapeshifters', href: '/guide/shapeshifters' },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
const GuideHeader: React.FunctionComponent<IProps> = ({ openAddressModel }) => {
  const router = useRouter();
  const gotoPage = (href: string) => {
    router.push(href);
  };
  return (
    <>
      <Nav openAddressModel={openAddressModel} />
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="/images/header-bg.png"
            alt="Creepz Invasion Grounds"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-8">
          <div>
            <div className="mt-3 sm:mt-4">
              <div className="sm:hidden">
                <label htmlFor="current-tab" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="current-tab"
                  name="current-tab"
                  className="block w-full pl-3 pr-10 py-2 text-base bg-creepz-green-light focus:outline-none sm:text-sm"
                  defaultValue={router.pathname}
                  onChange={(ev) => gotoPage(ev.target.value)}
                >
                  {tabs.map((tab) => (
                    <option key={tab.href} value={tab.href}>
                      {tab.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        router.pathname === tab.href
                          ? 'border-creepz-green-light text-creepz-green-light creepz-glowy-text'
                          : 'border-transparent text-gray-100 hover:text-creepz-purple hover:border-creepz-purple',
                        'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                      )}
                      aria-current={
                        router.pathname === tab.href ? 'page' : undefined
                      }
                    >
                      {tab.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideHeader;
