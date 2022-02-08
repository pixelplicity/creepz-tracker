import React, { useEffect, useState } from 'react';

import { Transition } from '@headlessui/react';
import { useRealtime } from 'react-supabase';
import useSWR from 'swr';

import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import type { BLEPlayer } from 'pages/api/ble/[leaderboard]';
import fetcher from 'services/swrFetcher';

import LiveItem from './LiveItem';

interface IProps {}
const LiveSpinFeed: React.FunctionComponent<IProps> = () => {
  const { data: profileData } = useSWR(`/api/ble/profiles`, fetcher);
  const [{ data }] = useRealtime('mystery_box_activity', {
    select: {
      columns: 'hash,date,action,amount,address',
    },
  });
  const [prevData, setPrevData] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      let newData = data
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 25)
        .map((i) => ({ ...i, new: false }));
      if (prevData && prevData[0]) {
        const newIndex = newData.findIndex(
          (item) => item.hash === prevData[0].hash
        );
        for (let i = 0; i < newIndex; i += 1) {
          newData[i].new = true;
        }
      }
      newData = newData.map((datum) => {
        return {
          ...datum,
          nickname: profileData?.data.find(
            (profile: BLEPlayer) => profile.user === datum.address
          )?.nickname,
        };
      });

      setPrevData(newData);
    }
  }, [data]);
  return (
    <GlowyBox title="Live Feed" isLoading={!data}>
      <div className="flow-root mt-6 max-w-lg mx-auto">
        <ul role="list">
          {prevData &&
            prevData.map((item, idx) =>
              item.new ? (
                <Transition
                  appear={true}
                  show={true}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                  key={item.hash}
                >
                  <LiveItem item={item} index={idx} />
                </Transition>
              ) : (
                <LiveItem key={item.hash} item={item} index={idx} />
              )
            )}
        </ul>
      </div>
    </GlowyBox>
  );
};

export default LiveSpinFeed;
