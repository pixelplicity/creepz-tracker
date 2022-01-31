import React, { useState } from 'react';

import { QuestionMarkCircleIcon } from '@heroicons/react/outline';

import PlayerTable from 'components/PlayerTable/PlayerTable';
import PlayerTableModal from 'components/PlayerTableModal/PlayerTableModal';
import Button from 'components/ui/Button/Button';
import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import LoadingText from 'components/ui/LoadingText/LoadingText';
import useGameStats from 'hooks/useGameStats';
import formatNumber from 'lib/formatNumber';

interface IProps {
  group?: string;
}
const GameDashboard: React.FunctionComponent<IProps> = ({ group }) => {
  const {
    gameData,
    floorData,
    loomiSupply,
    totalArmouries,
    totalCreepz,
    isLoading,
  } = useGameStats();
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  return (
    <div className="mt-12">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        <GlowyBox title="Loomi" isLoading={false}>
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <div className="flex justify-center items-baseline">
              <LoadingText isLoading={isLoading}>
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {formatNumber(loomiSupply, 2)}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                ERC-20
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <LoadingText
                isLoading={
                  isLoading && !gameData?.leaderboard?.game?.game_loomi
                }
              >
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {formatNumber(gameData?.leaderboard?.game?.game_loomi, 2)}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                in-game
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <LoadingText
                isLoading={
                  isLoading && !gameData?.leaderboard?.game?.spent_loomi
                }
              >
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {formatNumber(gameData?.leaderboard?.game?.spent_loomi, 2)}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                spent
              </p>
            </div>

            <div className="flex justify-center items-baseline">
              <LoadingText
                isLoading={
                  isLoading && !gameData?.leaderboard?.game?.yield_loomi
                }
              >
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {formatNumber(gameData?.leaderboard?.game?.yield_loomi, 2)}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                yield
              </p>
            </div>
          </div>
        </GlowyBox>
        <GlowyBox title="Creepz" isLoading={false}>
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <div className="flex justify-center items-baseline">
              <LoadingText isLoading={isLoading && !totalCreepz}>
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {totalCreepz}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                total
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <LoadingText
                isLoading={
                  isLoading && !gameData?.leaderboard?.game?.staked_creepz
                }
              >
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {gameData?.leaderboard?.game?.staked_creepz}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                staked
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <LoadingText isLoading={isLoading && !floorData?.prices?.creepz}>
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {floorData?.prices?.creepz}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                floor
              </p>
            </div>
          </div>
        </GlowyBox>
        <GlowyBox title="Armouries" isLoading={false}>
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <div className="flex justify-center items-baseline">
              <LoadingText isLoading={isLoading && !totalArmouries}>
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {totalArmouries}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                total
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <LoadingText
                isLoading={
                  isLoading && !gameData?.leaderboard?.game?.staked_armouries
                }
              >
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {gameData?.leaderboard?.game?.staked_armouries}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                staked
              </p>
            </div>
            <div className="flex justify-center items-baseline">
              <LoadingText isLoading={isLoading && !floorData?.prices?.armoury}>
                <p className="text-2xl font-semibold text-creepz-green-light creepz-glowy-text">
                  {floorData?.prices?.armoury}
                </p>
              </LoadingText>
              <p className="ml-2 items-baseline text-sm font-semibold text-creepz-green creepz-glowy-text">
                floor
              </p>
            </div>
          </div>
        </GlowyBox>
        <div className="sm:col-span-2 lg:col-span-3  mt-8">
          <GlowyBox
            title={`${group || ''} Leaderboard`}
            isLoading={false}
            titleIcon={
              <Button onClick={() => setIsTableModalOpen(true)}>
                <QuestionMarkCircleIcon
                  className="h-8 w-8"
                  aria-hidden="true"
                />
              </Button>
            }
          >
            <PlayerTable group={group} />
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
