import React, { useState } from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/outline';

import PlayerTable from 'components/PlayerTable/PlayerTable';
import PlayerTableModal from 'components/PlayerTableModal/PlayerTableModal';
import Button from 'components/ui/Button/Button';
import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import StatBox from 'components/ui/StatBox/StatBox';
import SwappableText from 'components/ui/SwappableText/SwappableText';
import formatNumber from 'lib/formatNumber';

interface IProps {
  groupData: any;
  groupLoading: boolean;
  loomiPrice: any;
  loomiPriceLoading: boolean;
  floorPrices: any;
  floorPriceLoading: boolean;
}
const GroupDashboard: React.FunctionComponent<IProps> = ({
  groupData,
  groupLoading,
  loomiPrice,
  loomiPriceLoading,
  floorPrices,
  floorPriceLoading,
}) => {
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
              {formatNumber(groupData?.leaderboard?.group?.game_loomi, 2)}
            </StatBox>
            <StatBox label="yield">
              {formatNumber(groupData?.leaderboard?.group?.yield_loomi, 2)}
            </StatBox>
            <StatBox label="ERC-20">
              {formatNumber(groupData?.leaderboard?.group?.erc20_loomi, 2)}
            </StatBox>
            <StatBox label="spent">
              {formatNumber(groupData?.leaderboard?.group?.spent_loomi, 2)}
            </StatBox>
            <StatBox label="bribes">
              {formatNumber(groupData?.leaderboard?.group?.bribes_pool, 2)}
            </StatBox>
            <StatBox label="price">
              <SwappableText>
                {(swapped: boolean) =>
                  swapped ? (
                    <span>{loomiPrice.eth.toFixed(8)}</span>
                  ) : (
                    Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(loomiPrice.usd)
                  )
                }
              </SwappableText>
            </StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Creepz"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {groupData?.leaderboard?.group?.staked_creepz}
            </StatBox>
            <StatBox label="unstaked">
              {groupData?.leaderboard?.group?.creepz &&
                groupData?.leaderboard?.group?.staked_creepz &&
                groupData.leaderboard.group.creepz -
                  groupData.leaderboard.group.staked_creepz}
            </StatBox>
            <StatBox label="total">
              {groupData?.leaderboard?.group?.creepz}
            </StatBox>
            <StatBox />
            <StatBox label="floor">{floorPrices?.creepz}</StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Armouries"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {groupData?.leaderboard?.group?.staked_armouries}
            </StatBox>
            <StatBox label="unstaked">
              {groupData?.leaderboard?.group?.armouries &&
                groupData?.leaderboard?.group?.staked_armouries &&
                groupData.leaderboard.group.armouries -
                  groupData.leaderboard.group.staked_armouries}
            </StatBox>
            <StatBox label="total">
              {groupData?.leaderboard?.group?.armouries}
            </StatBox>
            <StatBox />
            <StatBox label="floor">{floorPrices?.armoury}</StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Shapeshifters"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="total">
              {groupData?.leaderboard?.group?.shapeshifters}
            </StatBox>
            <StatBox label="floor">{floorPrices?.shapeshifter}</StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Megas"
          isLoading={groupLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="total">
              {groupData?.leaderboard?.group?.mega_shapeshifters}
            </StatBox>
            <StatBox label="floor">{floorPrices?.megaShapeshifter}</StatBox>
          </div>
        </GlowyBox>
        <div className="sm:col-span-2 lg:col-span-3">
          <GlowyBox
            title="Leaderboard"
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
            <PlayerTable isGroup />
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
