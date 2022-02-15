import React from 'react';

import Modal from 'components/ui/Modal/Modal';
import StatBox from 'components/ui/StatBox/StatBox';

const week1ItemsMeta = [
  {
    name: 'The Dad Cap of Destiny',
    points: '+3',
    image: 'https://www.creepz.co/static/media/eight.e53c1809.png',
  },
  {
    name: 'Toxic Bindweed',
    points: '-1',
    image: 'https://www.creepz.co/static/media/three.58fc8f72.png',
  },
  {
    name: 'The Sacred Sneakers of Wisdom',
    points: '+7',
    image: 'https://www.creepz.co/static/media/nine.7c56ec7b.png',
  },
  {
    name: 'The Shorts of Unyielding Glory',
    points: '+5',
    image: 'https://www.creepz.co/static/media/ten.69096589.png',
  },
  {
    name: 'Shard',
    points: '+12',
    image: 'https://www.creepz.co/static/media/five.7dc49dc5.gif',
  },
  {
    name: 'Overlord Rugged',
    points: '+1',
    image: 'https://www.creepz.co/static/media/four.2bf68fef.png',
  },
  {
    name: 'Homemade Cricket Casserole',
    points: '+2',
    image: 'https://www.creepz.co/static/media/six.059bf641.png',
  },
  {
    name: 'Shard',
    points: '+12',
    image: 'https://www.creepz.co/static/media/second-shard.5c23c392.gif',
  },
  {
    name: 'Radioactive Boronite',
    points: '-1',
    image: 'https://www.creepz.co/static/media/one.42ba0c8f.png',
  },
  {
    name: 'The Amulet of Renewal',
    points: '+10',
    image: 'https://www.creepz.co/static/media/seven.13f14946.png',
  },
];

const week2ItemsMeta = [
  {
    name: 'What The Duck',
    points: '+6',
    image: 'https://www.creepz.co/static/media/WhatTheDuck.55f19a60.png',
  },
  {
    name: 'Blessed All Seeing Eye',
    points: '+4',
    image:
      'https://www.creepz.co/static/media/BlessedAllSeeingEye.8d617d4c.png',
  },
  {
    name: 'Quantum Gyroscope',
    points: '+2',
    image: 'https://www.creepz.co/static/media/QuantumGyroscope.8434975c.png',
  },
  {
    name: 'Skull Of The Fallen Ape',
    points: '-1',
    image:
      'https://www.creepz.co/static/media/SkullOfTheFallenApe.d3b66e3f.png',
  },
  {
    name: 'Shard',
    points: '+15',
    image: 'https://www.creepz.co/static/media/GREEN.1f218070.gif',
  },
  {
    name: `80's Power Glove`,
    points: '+1',
    image: 'https://www.creepz.co/static/media/80s-Power-Glove.6e33652e.png',
  },
  {
    name: 'Candles Of Truth',
    points: '+10',
    image: 'https://www.creepz.co/static/media/CandlesOfTruth.faf8ec8d.png',
  },
  {
    name: 'Lemurian Bobbles Of Despair',
    points: '-1',
    image:
      'https://www.creepz.co/static/media/LemurianBobblesOfDispair.7f7fcdb1.png',
  },
  {
    name: 'Pencil Crop Circle',
    points: '+3',
    image: 'https://www.creepz.co/static/media/PencilCropCircle.4c10c996.png',
  },
  {
    name: 'Shard',
    points: '+7',
    image: 'https://www.creepz.co/static/media/PURPLE.6ac25e5d.gif',
  },
];
interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  gamePoints: number;
  disciplePoints: number;
  points: number;
  items: number[];
  rank: number;
  numberOfSpins: number;
  previousNumberOfSpins: number;
}

const PlayerTableModal: React.FunctionComponent<IProps> = ({
  isOpen,
  handleClose,
  points,
  gamePoints,
  disciplePoints,
  rank,
  previousNumberOfSpins,
  numberOfSpins,
  items,
}) => {
  const week1Items = items.slice(0, 10);
  const week2Items = items.slice(10, 20);
  // const week3Items = items.slice(20,30);
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Points &amp; Artefacts"
    >
      <div className="mt-2">
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-3 gap-y-6">
          <StatBox label="rank">{rank ? rank + 1 : 'N/A'}</StatBox>
          <StatBox label="total spins">{`${numberOfSpins}`}</StatBox>
          <StatBox label="today's spins">{`${
            numberOfSpins - previousNumberOfSpins
          }`}</StatBox>
          <StatBox label="game points">{gamePoints || '0.0'}</StatBox>
          <StatBox label="disciple points">
            {disciplePoints ? disciplePoints.toFixed(1) : '0.0'}
          </StatBox>
          <StatBox label="total points">{points || '0.0'}</StatBox>
        </div>
        <div className="mt-6">
          <h3 className="text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
            Week 2 Artefacts
          </h3>
          <ul
            role="list"
            className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
          >
            {week2ItemsMeta.map((item, idx) => (
              <li key={idx} className="relative">
                <div className="relative block w-full rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="object-cover pointer-events-none w-full"
                  />
                  <p className="absolute top-2 right-2 text-black">
                    x{week2Items[idx]}
                  </p>
                </div>
                <p className="text-center mt-2 block text-sm font-medium text-creepz-green-light creepz-glowy-text">
                  {item.name}
                  <br />({item.points})
                </p>
              </li>
            ))}
          </ul>
          <h3 className="text-xl leading-6 font-medium text-creepz-green-light creepz-glowy-text">
            Week 1 Artefacts
          </h3>
          <ul
            role="list"
            className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8"
          >
            {week1ItemsMeta.map((item, idx) => (
              <li key={idx} className="relative">
                <div className="relative block w-full rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="object-cover pointer-events-none w-full"
                  />
                  <p className="absolute top-2 right-2 text-black">
                    x{week1Items[idx]}
                  </p>
                </div>
                <p className="text-center mt-2 block text-sm font-medium text-creepz-green-light creepz-glowy-text">
                  {item.name}
                  <br />({item.points})
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default PlayerTableModal;
