import React from 'react';

import Modal from 'components/ui/Modal/Modal';
import StatBox from 'components/ui/StatBox/StatBox';

const week1ItemsMeta = [
  {
    name: 'The Dad Cap of Destiny',
    points: '+1',
    image: 'https://www.creepz.co/static/media/eight.e53c1809.png',
  },
  {
    name: 'Toxic Bindweed',
    points: '-2',
    image: 'https://www.creepz.co/static/media/three.58fc8f72.png',
  },
  {
    name: 'The Sacred Sneakers of Wisdom',
    points: '+3',
    image: 'https://www.creepz.co/static/media/nine.7c56ec7b.png',
  },
  {
    name: 'The Shorts of Unyielding Glory',
    points: '+2',
    image: 'https://www.creepz.co/static/media/ten.69096589.png',
  },
  {
    name: 'Alpha Shard',
    points: '0',
    image: 'https://www.creepz.co/static/media/five.7dc49dc5.gif',
  },
  {
    name: 'Overlord Rugged',
    points: '0',
    image: 'https://www.creepz.co/static/media/four.2bf68fef.png',
  },
  {
    name: 'Homemade Cricket Casserole',
    points: '+1',
    image: 'https://www.creepz.co/static/media/six.059bf641.png',
  },
  {
    name: 'The Treacherous Disc',
    points: '-1',
    image: 'https://www.creepz.co/static/media/two.672936de.png',
  },
  {
    name: 'Radioactive Boronite',
    points: '-4',
    image: 'https://www.creepz.co/static/media/one.42ba0c8f.png',
  },
  {
    name: 'The Amulet of Renewal',
    points: '+10',
    image: 'https://www.creepz.co/static/media/seven.13f14946.png',
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
}

const PlayerTableModal: React.FunctionComponent<IProps> = ({
  isOpen,
  handleClose,
  points,
  gamePoints,
  disciplePoints,
  rank,
  items,
}) => {
  const week1Items = items.slice(0, 10);
  // const week2Items = items.slice(10,20);
  // const week3Items = items.slice(20,30);
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Points &amp; Artefacts"
    >
      <div className="mt-2">
        <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-5">
          <StatBox label="rank">{rank}</StatBox>
          <StatBox label="game points">{gamePoints}</StatBox>
          <StatBox label="disciple points">{disciplePoints}</StatBox>
          <StatBox label="total points">{points}</StatBox>
        </div>
        <div className="mt-6">
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
