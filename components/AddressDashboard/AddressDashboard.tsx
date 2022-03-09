import React, { useState } from 'react';

import { EyeIcon } from '@heroicons/react/outline';

import CreepzModal from 'components/CreepzModal/CreepzModal';
import LamboModal from 'components/LamboModal/LamboModal';
// import PointsModal from 'components/PointsModal/PointsModal';
import PointsModal from 'components/PointsModal/PointsModal';
import TokenModal from 'components/TokenModal/TokenModal';
import Button from 'components/ui/Button/Button';
import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import StatBox from 'components/ui/StatBox/StatBox';
import SwappableText from 'components/ui/SwappableText/SwappableText';
import VaultModal from 'components/VaultModal/VaultModal';
import { address as armouryAddress } from 'contracts/Arms/Arms';
import { address as creepzAddress } from 'contracts/Creepz/Creepz';
import { address as megaShapeshifterAddress } from 'contracts/MegaShapeshifters/MegaShapeshifters';
import { address as shapeshifterAddress } from 'contracts/Shapeshifters/Shapeshifters';

interface IProps {
  address: string;
  walletData: any;
  walletLoading: boolean;
  loomiPrice: any;
  loomiPriceLoading: boolean;
  floorPrices: any;
  floorPriceLoading: boolean;
}
const AddressDashboard: React.FunctionComponent<IProps> = ({
  walletData,
  walletLoading,
  loomiPrice,
  loomiPriceLoading,
  floorPrices,
  floorPriceLoading,
}) => {
  const [isCreepzModalOpen, setIsCreepzModalOpen] = useState<boolean>(false);
  const [isArmouryModalOpen, setIsArmouryModalOpen] = useState<boolean>(false);
  const [isLamboModalOpen, setIsLamboModalOpen] = useState<boolean>(false);
  const [isSSModalOpen, setIsSSModalOpen] = useState<boolean>(false);
  const [isMegaSSModalOpen, setIsMegaSSModalOpen] = useState<boolean>(false);
  const [isBLEModalOpen, setIsBLEModalOpen] = useState<boolean>(false);
  const [isMegaVaultsModalOpen, setIsVaultsModalOpen] =
    useState<boolean>(false);
  return (
    <div className="-mt-12">
      <dl className="m-5 grid grid-cols-1 gap-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 ">
        <GlowyBox
          title="$Loomi"
          className="md:col-span-2"
          isLoading={walletLoading || loomiPriceLoading || floorPriceLoading}
          titleIcon={
            <Button onClick={() => setIsLamboModalOpen(true)}>
              <svg
                version="1.1"
                x="0px"
                y="0px"
                fill="currentColor"
                className="h-6 w-6"
                width="462.979px"
                height="462.979px"
                viewBox="0 0 462.979 462.979"
                enableBackground="new 0 0 462.979 462.979"
              >
                <g>
                  <g>
                    <path
                      d="M72.376,388.44c-14.921,0-27.036-12.114-27.036-27.046c0-2.593,0.487-5.045,1.162-7.414
			c-14.689-6.692-27.751-13.564-36.856-19.296c-3.503,8.208-5.442,17.232-5.442,26.71c0,37.653,30.531,68.183,68.181,68.183
			c30.592,0,56.484-20.146,65.118-47.913c-11.267-0.417-25.646-3.603-40.948-8.359C92.137,382.229,83.028,388.44,72.376,388.44z"
                    />
                    <path
                      d="M76.885,265.994c-35.227,0-65.269,22.237-76.833,53.446c-3.29,8.865,149.447,82.317,157.091,44.979
			c1.092-5.342,1.667-10.848,1.667-16.507C158.811,302.67,122.131,265.994,76.885,265.994z"
                    />
                    <path
                      d="M388.524,196.455c9.329-1.918,17.256-8.157,18.871-15.647c1.947-9.005-5.947-16.306-17.633-16.306H262.808
			c-11.689,0-22.729,7.301-24.676,16.306c-1.948,9.01,5.94,16.314,17.622,16.314h11.293c10.067,22.255,30,74.498,11.638,105.8
			c-23.804,40.556-109.669,42.327-120.072-33.51c-9.56-69.607,10.449-162.938,13.804-177.77
			c23.478-5.983,53.373-15.128,53.373-22.979c0-10.113-44.236-14.475-63.502-15.89c-7.151-13.154-22.844-22.309-41.11-22.309
			c-1.242,0-2.468,0.076-3.683,0.158c3.218,8.255,7.596,23.197,7.205,42.815c-0.298,14.812-2.771,25.868-5.26,33.366
			c0.579,0.022,1.146,0.076,1.737,0.076c8.796,0,16.961-2.166,23.904-5.843c-7.271,16.04-19.093,48.007-21.348,90.173
			c-0.697,12.982-10.52,25.778-23.229,28.549l-6.633,1.453c-12.709,2.757-23.017,12.321-23.017,21.365v16.362
			c1.932-0.132,3.867-0.232,5.821-0.232c49.065,0,88.989,39.914,88.989,88.978c0,4.616-0.465,9.192-1.167,13.721h132.756
			c-4.557-13.152-30.3-96.134,44.371-94.679c74.573,1.458,104.754,81.747,109.134,94.679h12.179c0,0,2.645-46.133-34.384-103.447
			C401.035,215.34,393.489,208.307,388.524,196.455z"
                    />
                    <path
                      d="M373.372,391.382c-14.579,0-26.377-11.573-26.93-26.016h-40.278c0,0,4.913,67.148,67.208,67.148
			c37.313,0,67.581-29.968,68.135-67.148h-41.192C399.761,379.816,387.963,391.382,373.372,391.382z"
                    />
                    <path d="M343.821,274.013c-72.21-1.427-38.939,85.887-38.939,85.887h136.625C441.507,359.899,416.023,275.423,343.821,274.013z" />
                    <path
                      d="M75.911,68.672c0,18.499,15.581,33.923,36.257,37.458c2.451-6.861,5.168-17.663,5.475-32.825
			c0.398-19.767-4.42-34.548-7.364-41.677C90.556,35.747,75.911,50.759,75.911,68.672z"
                    />
                  </g>
                </g>
              </svg>
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-3">
            <StatBox label="balance">{walletData.userReward}</StatBox>
            <StatBox label="bribe claim">{walletData.taxClaimable}</StatBox>
            <StatBox label="vault claim">{walletData.vaultReward}</StatBox>
            <StatBox label="ERC-20">{walletData.userBalance}</StatBox>
            <StatBox label="yield">{walletData.userYield}</StatBox>
            <StatBox label="spent">{walletData.userSpent}</StatBox>
            <StatBox label="price">
              <SwappableText>
                {(swapped: boolean) =>
                  swapped ? (
                    <span>{loomiPrice.eth.toFixed(8)}</span>
                  ) : (
                    <span>${loomiPrice.usd.toFixed(4)}</span>
                  )
                }
              </SwappableText>
            </StatBox>
            <StatBox label="value">
              <SwappableText>
                {(swapped: boolean) =>
                  swapped ? (
                    Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(
                      ((walletData.userReward +
                        walletData.taxClaimable +
                        walletData.vaultReward) *
                        0.75 +
                        walletData.userBalance) *
                        loomiPrice.usd
                    )
                  ) : (
                    <span>
                      {(
                        ((walletData.userReward +
                          +walletData.taxClaimable +
                          walletData.vaultReward) *
                          0.75 +
                          walletData.userBalance) *
                        loomiPrice.eth
                      ).toFixed(2)}
                    </span>
                  )
                }
              </SwappableText>
            </StatBox>
          </div>
          <LamboModal
            isOpen={isLamboModalOpen}
            handleClose={() => setIsLamboModalOpen(false)}
            title="Wen Vespa?"
            price={loomiPrice}
            userYield={+walletData.userYield}
            userReward={+walletData.userReward}
            taxClaimable={+walletData.taxClaimable}
            vaultReward={+walletData.vaultReward}
            userBalance={+walletData.userBalance}
          />
        </GlowyBox>
        <GlowyBox
          isLoading={walletLoading || loomiPriceLoading || floorPriceLoading}
          title="Points"
          titleIcon={
            <Button onClick={() => setIsBLEModalOpen(true)}>
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="game">
              {(walletData.gamePoints || 0).toFixed(1)}
            </StatBox>
            <StatBox label="total">
              {(walletData.points || 0).toFixed(1)}
            </StatBox>
            <StatBox label="rank">
              {walletData.rank ? walletData.rank + 1 : 'N/A'}
            </StatBox>
            <StatBox label="Wk1 Shards">
              {walletData.shards ? walletData.shards[0] : 0}
            </StatBox>
            <StatBox label="Wk2 Shards">
              {walletData.shards ? walletData.shards[1] : 0}
            </StatBox>
            <StatBox label="Wk3 Shards">
              {walletData.shards ? walletData.shards[2] : 0}
            </StatBox>
            <PointsModal
              isOpen={isBLEModalOpen}
              handleClose={() => setIsBLEModalOpen(false)}
              items={walletData.userItems}
              gamePoints={walletData.gamePoints}
              disciplePoints={walletData.disciplePoints}
              points={walletData.points}
              rank={walletData.rank}
              numberOfSpins={walletData.numberOfSpins}
              previousNumberOfSpins={walletData.previousNumberOfSpins}
            />
          </div>
        </GlowyBox>
        <GlowyBox
          isLoading={walletLoading || loomiPriceLoading || floorPriceLoading}
          title="Creepz"
          titleIcon={
            <Button onClick={() => setIsCreepzModalOpen(true)}>
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">{walletData.creeps.staked.length}</StatBox>

            <StatBox label="unstaked">
              {walletData.creeps.unstaked.length}
            </StatBox>

            <StatBox label="floor">{floorPrices?.creepz}</StatBox>
            <StatBox label="value">
              {floorPrices?.creepz &&
                (
                  (walletData.creeps.staked.length +
                    walletData.creeps.unstaked.length) *
                  floorPrices.creepz
                ).toFixed(2)}
            </StatBox>
            <CreepzModal
              isOpen={isCreepzModalOpen}
              handleClose={() => setIsCreepzModalOpen(false)}
              title="Your Creepz"
              stakedIds={walletData.creeps.staked}
              unstakedIds={walletData.creeps.unstaked}
              names={walletData.creeps.names}
              baseUrl="https://api.creepz.co/creepz/_||_"
              address={creepzAddress}
            />
          </div>
        </GlowyBox>
        <GlowyBox
          isLoading={walletLoading || loomiPriceLoading || floorPriceLoading}
          title="Armouries"
          titleIcon={
            <Button onClick={() => setIsArmouryModalOpen(true)}>
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">
              {walletData.armouries.staked.length}
            </StatBox>
            <StatBox label="unstaked">
              {walletData.armouries.unstaked.length}
            </StatBox>
            <div className="lg:hidden">
              <StatBox label="total">
                {walletData.armouries.staked.length +
                  walletData.armouries.unstaked.length}
              </StatBox>
              <StatBox />
            </div>
            <StatBox label="floor">{floorPrices.armoury}</StatBox>
            <StatBox label="value">
              {floorPrices?.armoury &&
                (
                  (walletData.armouries.staked.length +
                    walletData.armouries.unstaked.length) *
                  floorPrices.armoury
                ).toFixed(2)}
            </StatBox>
          </div>
          <TokenModal
            isOpen={isArmouryModalOpen}
            handleClose={() => setIsArmouryModalOpen(false)}
            title="Your Armouries"
            stakedIds={walletData.armouries.staked}
            unstakedIds={walletData.armouries.unstaked}
            stakeable
            baseUrl="https://api.creepz.co/armoury/_||_/image/?1642708904765"
            address={armouryAddress}
          />
        </GlowyBox>
        <GlowyBox
          isLoading={walletLoading || loomiPriceLoading || floorPriceLoading}
          title="Shapeshifters"
          titleIcon={
            <Button onClick={() => setIsSSModalOpen(true)}>
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="total">{walletData.shapeshifters.length}</StatBox>
            <StatBox />
            <StatBox label="floor">{floorPrices.shapeshifter}</StatBox>
            <StatBox label="value">
              {floorPrices?.shapeshifter &&
                (
                  walletData.shapeshifters.length * floorPrices.shapeshifter
                ).toFixed(2)}
            </StatBox>
          </div>
          <TokenModal
            isOpen={isSSModalOpen}
            handleClose={() => setIsSSModalOpen(false)}
            title="Your Shapeshifters"
            stakedIds={walletData.shapeshifters}
            baseUrl="https://cbc-backend-ajxin.ondigitalocean.app/shapeshifters/_||_/image"
            address={shapeshifterAddress}
          />
        </GlowyBox>
        <GlowyBox
          isLoading={walletLoading || loomiPriceLoading || floorPriceLoading}
          title="Megas"
          titleIcon={
            <Button onClick={() => setIsMegaSSModalOpen(true)}>
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="total">
              {walletData.megaShapeshifters.length}
            </StatBox>
            <StatBox label="bribe">{walletData.taxClaimable}</StatBox>
            <StatBox label="floor">{floorPrices.megaShapeshifter}</StatBox>
            <StatBox label="value">
              {floorPrices?.megaShapeshifter &&
                (
                  walletData.megaShapeshifters.length *
                  floorPrices.megaShapeshifter
                ).toFixed(2)}
            </StatBox>
          </div>
          <TokenModal
            isOpen={isMegaSSModalOpen}
            handleClose={() => setIsMegaSSModalOpen(false)}
            title="Your Megas"
            stakedIds={walletData.megaShapeshifters}
            baseUrl="https://cbc-backend-ajxin.ondigitalocean.app/megas/_||_/image"
            address={megaShapeshifterAddress}
          />
        </GlowyBox>
        <GlowyBox
          isLoading={walletLoading || loomiPriceLoading || floorPriceLoading}
          title="Vaults"
          titleIcon={
            <Button onClick={() => setIsVaultsModalOpen(true)}>
              <EyeIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          }
        >
          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
            <StatBox label="staked">{walletData.vaults.staked.length}</StatBox>
            <StatBox label="unstaked">
              {walletData.vaults.unstaked.length}
            </StatBox>
            <StatBox label="floor">{floorPrices.vault}</StatBox>
            <StatBox label="value">
              {floorPrices?.vault &&
                (
                  (walletData.vaults.staked.length +
                    walletData.vaults.unstaked.length) *
                  floorPrices.vault
                ).toFixed(2)}
            </StatBox>
          </div>
          <VaultModal
            isOpen={isMegaVaultsModalOpen}
            handleClose={() => setIsVaultsModalOpen(false)}
            title="Your Vaults"
            vaultIds={walletData.vaults.staked}
            accumulation={walletData.vaultAccumulation}
            priceChange={walletData.vaultPriceChange}
            reward={walletData.vaultReward}
          />
        </GlowyBox>
      </dl>
    </div>
  );
};

export default AddressDashboard;
