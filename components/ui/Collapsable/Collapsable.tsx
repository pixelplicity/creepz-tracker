import * as React from 'react';

import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

interface IProps {
  title: string;
  defaultOpen?: boolean;
}
const Collpasable: React.FunctionComponent<IProps> = ({
  title,
  defaultOpen,
  children,
}) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <Disclosure defaultOpen={defaultOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm text-left">
                <h3 className="text-xl leading-6 font-medium text-creepz-pink">
                  {title}
                </h3>
                <ChevronUpIcon
                  className={`${
                    open ? '' : 'transform rotate-180'
                  } w-5 h-5 text-creepz-pink`}
                />
              </Disclosure.Button>
              <Disclosure.Panel>{children}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Collpasable;
