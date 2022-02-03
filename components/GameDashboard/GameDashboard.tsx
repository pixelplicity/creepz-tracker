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
  gameData: any;
  gameLoading: boolean;
  loomiPrice: any;
  loomiPriceLoading: boolean;
  floorPrices: any;
  floorPriceLoading: boolean;
}
const GameDashboard: React.FunctionComponent<IProps> = ({
  gameData,
  gameLoading,
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
          isLoading={gameLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="in-game">
              {formatNumber(gameData?.leaderboard?.game?.game_loomi, 2)}
            </StatBox>
            <StatBox label="yield">
              {formatNumber(gameData?.leaderboard?.game?.yield_loomi, 2)}
            </StatBox>
            <StatBox label="ERC-20">
              {formatNumber(gameData?.leaderboard?.game?.erc20_loomi, 2)}
            </StatBox>
            <StatBox label="spent">
              {formatNumber(gameData?.leaderboard?.game?.spent_loomi, 2)}
            </StatBox>
            <StatBox label="bribes">
              {formatNumber(gameData?.leaderboard?.game?.bribes_pool, 2)}
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
          isLoading={gameLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {gameData?.leaderboard?.game?.staked_creepz}
            </StatBox>
            <StatBox label="unstaked">
              {gameData?.leaderboard?.game?.creepz &&
                gameData?.leaderboard?.game?.staked_creepz &&
                gameData.leaderboard.game.creepz -
                  gameData.leaderboard.game.staked_creepz}
            </StatBox>
            <StatBox label="total">
              {gameData?.leaderboard?.game?.creepz}
            </StatBox>
            <StatBox />
            <StatBox label="floor">{floorPrices?.creepz}</StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Armouries"
          isLoading={gameLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {gameData?.leaderboard?.game?.staked_armouries}
            </StatBox>
            <StatBox label="unstaked">
              {gameData?.leaderboard?.game?.armouries &&
                gameData?.leaderboard?.game?.staked_armouries &&
                gameData.leaderboard.game.armouries -
                  gameData.leaderboard.game.staked_armouries}
            </StatBox>
            <StatBox label="total">
              {gameData?.leaderboard?.game?.armouries}
            </StatBox>
            <StatBox />
            <StatBox label="floor">{floorPrices?.armoury}</StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Shapeshifters"
          isLoading={gameLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="total">
              {gameData?.leaderboard?.game?.shapeshifters}
            </StatBox>
            <StatBox />
            <StatBox label="floor">{floorPrices?.shapeshifter}</StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Megas"
          isLoading={gameLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="total">
              {gameData?.leaderboard?.game?.mega_shapeshifters}
            </StatBox>
            <StatBox />
            <StatBox label="floor">{floorPrices?.megaShapeshifter}</StatBox>
          </div>
        </GlowyBox>
        <GlowyBox
          title="Vaults"
          isLoading={gameLoading || loomiPriceLoading || floorPriceLoading}
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {gameData?.leaderboard?.game?.staked_vaults}
            </StatBox>
            <StatBox label="total">
              {gameData?.leaderboard?.game?.vaults}
            </StatBox>
            <StatBox label="floor">{floorPrices?.vault}</StatBox>
          </div>
        </GlowyBox>
        <div className="sm:col-span-2 lg:col-span-3">
          <GlowyBox
            title="Leaderboard"
            isLoading={gameLoading || loomiPriceLoading || floorPriceLoading}
            titleIcon={
              <Button onClick={() => setIsTableModalOpen(true)}>
                <QuestionMarkCircleIcon
                  className="h-8 w-8"
                  aria-hidden="true"
                />
              </Button>
            }
          >
            <PlayerTable />
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

export default GameDashboard;
