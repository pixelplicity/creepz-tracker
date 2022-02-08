import React from 'react';

import BLETable from 'components/BLETable/BLETable';
import LiveSpinFeed from 'components/LiveSpinFeed/LiveSpinFeed';
import Collapsable from 'components/ui/Collapsable/Collapsable';
import GlowyBox from 'components/ui/GlowyBox/GlowyBox';

const lounges = [
  {
    title: 'Top 3',
    lounge: 'top3',
    isOpen: true,
  },
  {
    title: 'First 50',
    lounge: 'first50',
    isOpen: false,
  },
  {
    title: 'Next 100',
    lounge: 'next100',
    isOpen: false,
  },
  {
    title: 'Next 200',
    lounge: 'next200',
    isOpen: false,
  },
  {
    title: 'Next 400',
    lounge: 'next400',
    isOpen: false,
  },
  {
    title: 'Next 600',
    lounge: 'next600',
    isOpen: false,
  },
  {
    title: 'Next 800',
    lounge: 'next800',
    isOpen: false,
  },
  {
    title: 'Next 900',
    lounge: 'next900',
    isOpen: false,
  },
  {
    title: 'Next 1000',
    lounge: 'next1000',
    isOpen: false,
  },
];
interface IProps {}
const BLEDashboard: React.FunctionComponent<IProps> = () => {
  return (
    <div className="mt-12">
      <dl className="mt-5 grid grid-cols-1 gap-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ">
        <GlowyBox
          title="Big Lizard Energy Leaderboard"
          isLoading={false}
          className="md:col-span-2"
        >
          {lounges.map((lounge) => (
            <Collapsable
              key={lounge.lounge}
              title={lounge.title}
              defaultOpen={lounge.isOpen}
            >
              <BLETable lounge={lounge.lounge} />
            </Collapsable>
          ))}
        </GlowyBox>
        <LiveSpinFeed />
      </dl>
    </div>
  );
};

export default BLEDashboard;
