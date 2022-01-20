import React from 'react';

import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import useWalletStats from 'hooks/useWalletStats';

interface IProps {
  address: string;
}
const AddressDashboard: React.FunctionComponent<IProps> = ({ address }) => {
  const {
    userReward,
    userYield,
    userSpent,
    userBalance,
    stakedCreepz,
    unstakedCreepz,
    stakedArmouries,
    unstakedArmouries,
    totalArmouries,
    totalCreepz,
  } = useWalletStats(address);
  return (
    <div className="-mt-12">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        <GlowyBox title="$Loomi">
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {userReward}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                balance
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {userSpent}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                spent
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {userYield}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                yield
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {userBalance}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                ERC-20
              </p>
            </div>
          </div>
        </GlowyBox>
        <GlowyBox title="Creepz">
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {stakedCreepz.length}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                staked
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {unstakedCreepz}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                unstaked
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {totalCreepz}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                total
              </p>
            </div>
          </div>
        </GlowyBox>
        <GlowyBox title="Armouries">
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {stakedArmouries.length}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                staked
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {unstakedArmouries}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                unstaked
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {totalArmouries}
              </p>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                total
              </p>
            </div>
          </div>
        </GlowyBox>
      </dl>
    </div>
  );
};

export default AddressDashboard;
