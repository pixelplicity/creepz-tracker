import React, { useState } from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/outline';

import GroupTable from 'components/GroupTable/GroupTable';
import PlayerTableModal from 'components/PlayerTableModal/PlayerTableModal';
import Button from 'components/ui/Button/Button';
import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import StatBox from 'components/ui/StatBox/StatBox';
import formatNumber from 'lib/formatNumber';

interface IProps {
  group: string | undefined;
  groupData: any;
  groupLoading: boolean;
  loomiPrice: any;
  loomiPriceLoading: boolean;
  floorPrices: any;
  floorPriceLoading: boolean;
}
const GroupDashboard: React.FunctionComponent<IProps> = ({
  group,
  groupData,
  groupLoading,
  loomiPriceLoading,
  floorPriceLoading,
}) => {
  console.log(groupData);

  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  return (
    <div className="mt-12">
      <dl className="mt-5 grid grid-cols-1 gap-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ">
        <GlowyBox
          title="Loomi"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="in-game">
              {formatNumber(groupData?.leaderboard?.game?.game_loomi, 2)}
            </StatBox>
            <StatBox label="yield">
              {formatNumber(groupData?.leaderboard?.game?.yield_loomi, 2)}
            </StatBox>
            <StatBox label="ERC-20">
              {formatNumber(groupData?.leaderboard?.game?.erc20_loomi, 2)}
            </StatBox>
            <StatBox label="spent">
              {formatNumber(groupData?.leaderboard?.game?.spent_loomi, 2)}
            </StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Creepz"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {groupData?.leaderboard?.game?.staked_creepz}
            </StatBox>
            <StatBox label="unstaked">
              {groupData?.leaderboard?.game?.creepz &&
                groupData?.leaderboard?.game?.staked_creepz &&
                groupData.leaderboard.game.creepz -
                  groupData.leaderboard.game.staked_creepz}
            </StatBox>
            <StatBox label="total">
              {groupData?.leaderboard?.game?.creepz}
            </StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Armouries"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {groupData?.leaderboard?.game?.staked_armouries}
            </StatBox>
            <StatBox label="unstaked">
              {groupData?.leaderboard?.game?.armouries &&
                groupData?.leaderboard?.game?.staked_armouries &&
                groupData.leaderboard.game.armouries -
                  groupData.leaderboard.game.staked_armouries}
            </StatBox>
            <StatBox label="total">
              {groupData?.leaderboard?.game?.armouries}
            </StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Shapeshifters"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="total">
              {groupData?.leaderboard?.game?.shapeshifters}
            </StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Megas"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="total">
              {groupData?.leaderboard?.game?.mega_shapeshifters}
            </StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Vaults"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {groupData?.leaderboard?.game?.staked_vaults}
            </StatBox>
            <StatBox label="total">
              {groupData?.leaderboard?.game?.vaults}
            </StatBox>
          </div>
        </GlowyBox>
        <div className="sm:col-span-2 lg:col-span-3">
          <GlowyBox
            title={`${group} Leaderboard`}
            isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
            titleIcon={
              <Button onClick={() => setIsTableModalOpen(true)}>
                <QuestionMarkCircleIcon
                  className="h-8 w-8"
                  aria-hidden="true"
                />
              </Button>
            }
          >
            {group && <GroupTable group={group} />}
          </GlowyBox>

          <PlayerTableModal
            isOpen={isTableModalOpen}
            handleClose={() => setIsTableModalOpen(false)}
          />
        </div>
      </dl>
    </div>
  );
};

export default GroupDashboard;
