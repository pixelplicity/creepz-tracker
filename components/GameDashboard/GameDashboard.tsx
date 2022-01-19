import React from 'react';

import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import useGameStats from 'hooks/useGameStats';

interface IProps {}
const GameDashboard: React.FunctionComponent<IProps> = () => {
  const { loomiSupply } = useGameStats();
  return (
    <div className="-mt-12">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        <GlowyBox title="Loomi">
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <div className="flex justify-center items-baseline">
              <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                {loomiSupply}
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

export default GameDashboard;
