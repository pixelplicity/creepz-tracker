import React, { useState } from 'react';

import useSWR from 'swr';

import Collapsable from 'components/ui/Collapsable/Collapsable';
import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import { Response } from 'pages/api/traits';
import fetcher from 'services/swrFetcher';
import { Trait } from 'types';

type SkinOptions =
  | 'grey'
  | 'green'
  | 'limegreen'
  | 'lilac'
  | 'peach'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'aqua'
  | 'pink'
  | 'blue'
  | 'fruity'
  | 'volt'
  | 'hell'
  | 'rainbow'
  | 'gold';

type SkinDetail = {
  name: string;
  preview: string;
  closed: string;
  arm: string;
  gunhand: string;
  hand: string;
};
const skinDetails: Record<SkinOptions, SkinDetail> = {
  grey: {
    name: 'Grey',
    preview: 'https://www.creepz.co/static/media/GREY.9cc4588e.png',
    closed: 'https://www.creepz.co/static/media/GREY_CLOSED.a4d5cc16.png',
    arm: 'https://www.creepz.co/static/media/greyArm.62cdaf27.png',
    gunhand: 'https://www.creepz.co/static/media/greyGunhand.759d9981.png',
    hand: 'https://www.creepz.co/static/media/greyHand.a304f0ff.png',
  },
  green: {
    name: 'Green',
    preview: 'https://www.creepz.co/static/media/PALE.7790939a.png',
    closed: 'https://www.creepz.co/static/media/PALE_CLOSED.fef2cda7.png',
    arm: 'https://www.creepz.co/static/media/paleArm.421ac08a.png',
    gunhand: 'https://www.creepz.co/static/media/paleGunhand.de02aab7.png',
    hand: 'https://www.creepz.co/static/media/paleHand.ebb9499f.png',
  },
  limegreen: {
    name: 'Lime Green',
    preview: 'https://www.creepz.co/static/media/GREEN.c8106928.png',
    closed: 'https://www.creepz.co/static/media/GREEN_CLOSED.144932fd.png',
    arm: 'https://www.creepz.co/static/media/greenArm.2912f75f.png',
    gunhand: 'https://www.creepz.co/static/media/greenGunhand.b6ebc9ae.png',
    hand: 'https://www.creepz.co/static/media/greenHand.b4a36b89.png',
  },
  lilac: {
    name: 'Lilac',
    preview: 'https://www.creepz.co/static/media/LILAC.ccb7ec2c.png',
    closed: 'https://www.creepz.co/static/media/LILAC_CLOSED.6459accb.png',
    arm: 'https://www.creepz.co/static/media/lilacArm.f71d12f6.png',
    gunhand: 'https://www.creepz.co/static/media/lilacGunhand.367aed07.png',
    hand: 'https://www.creepz.co/static/media/lilacHand.5be6c399.png',
  },
  peach: {
    name: 'Peach',
    preview: 'https://www.creepz.co/static/media/PEACH.d4fd535c.png',
    closed: 'https://www.creepz.co/static/media/PEACH_CLOSED.aff8d2cc.png',
    arm: 'https://www.creepz.co/static/media/peachArm.06a854f4.png',
    gunhand: 'https://www.creepz.co/static/media/peachGunhand.971b51ec.png',
    hand: 'https://www.creepz.co/static/media/peachHand.0bf3afca.png',
  },
  yellow: {
    name: 'Yellow',
    preview: 'https://www.creepz.co/static/media/YELLOW.0a97f56a.png',
    closed: 'https://www.creepz.co/static/media/YELLOW_CLOSED.f6545541.png',
    arm: 'https://www.creepz.co/static/media/yellowArm.36936222.png',
    gunhand: 'https://www.creepz.co/static/media/yellowGunhand.2ae4ebdf.png',
    hand: 'https://www.creepz.co/static/media/yellowHand.276c1d7f.png',
  },
  orange: {
    name: 'Orange',
    preview: 'https://www.creepz.co/static/media/ORANGE.cc74740c.png',
    closed: 'https://www.creepz.co/static/media/ORANGE_CLOSED.283e1a87.png',
    arm: 'https://www.creepz.co/static/media/orangeArm.2997c399.png',
    gunhand: 'https://www.creepz.co/static/media/orangeGunhand.36fb01e3.png',
    hand: 'https://www.creepz.co/static/media/orangeHand.39718f64.png',
  },
  red: {
    name: 'Red',
    preview: 'https://www.creepz.co/static/media/RED.4b95f9c7.png',
    closed: 'https://www.creepz.co/static/media/RED_CLOSED.96a9d99d.png',
    arm: 'https://www.creepz.co/static/media/redArm.1cc0eac1.png',
    gunhand: 'https://www.creepz.co/static/media/redGunhand.21826636.png',
    hand: 'https://www.creepz.co/static/media/redHand.b5a3d5c2.png',
  },
  aqua: {
    name: 'Aqua',
    preview: 'https://www.creepz.co/static/media/AQUA.af279474.png',
    closed: 'https://www.creepz.co/static/media/AQUA_CLOSED.72d9a081.png',
    arm: 'https://www.creepz.co/static/media/aquaArm.67517c1d.png',
    gunhand: 'https://www.creepz.co/static/media/aquaGunhand.8abd05f4.png',
    hand: 'https://www.creepz.co/static/media/aquaHand.2dd242a2.png',
  },
  pink: {
    name: 'Pink',
    preview: 'https://www.creepz.co/static/media/PINK.9ed91a12.png',
    closed: 'https://www.creepz.co/static/media/PINK_CLOSED.55da73d5.png',
    arm: 'https://www.creepz.co/static/media/pinkArm.621ebb3b.png',
    gunhand: 'https://www.creepz.co/static/media/pinkGunhand.c234f1dd.png',
    hand: 'https://www.creepz.co/static/media/pinkHand.0b5b7989.png',
  },
  blue: {
    name: 'Blue',
    preview: 'https://www.creepz.co/static/media/BLUE.e7bcce0e.png',
    closed: 'https://www.creepz.co/static/media/BLUE_CLOSED.6d9b8fb5.png',
    arm: 'https://www.creepz.co/static/media/blueArm.5ce59828.png',
    gunhand: 'https://www.creepz.co/static/media/blueGunhand.45f60001.png',
    hand: 'https://www.creepz.co/static/media/blueHand.1d4c66a9.png',
  },
  fruity: {
    name: 'Fruity',
    preview: 'https://www.creepz.co/static/media/FRUITY.4384ed3c.png',
    closed: 'https://www.creepz.co/static/media/FRUITY_CLOSED.43c99a9d.png',
    arm: 'https://www.creepz.co/static/media/toxicArm.4ec021b7.png',
    gunhand: 'https://www.creepz.co/static/media/fruityGunhand.8659d777.png',
    hand: 'https://www.creepz.co/static/media/fruityHand.8ba78b48.png',
  },
  volt: {
    name: 'Volt',
    preview: 'https://www.creepz.co/static/media/VOLT.883f3181.png',
    closed: 'https://www.creepz.co/static/media/VOLT_CLOSED.6c5fccd4.png',
    arm: 'https://www.creepz.co/static/media/voltArm.32544b67.png',
    gunhand: 'https://www.creepz.co/static/media/voltGunhand.7e7f632a.png',
    hand: 'https://www.creepz.co/static/media/voltHand.6bb9f7e5.png',
  },
  hell: {
    name: 'Hell Yeah',
    preview: 'https://www.creepz.co/static/media/HELLYEAH.f4670f4b.png',
    closed: 'https://www.creepz.co/static/media/HELLYEAH_CLOSED.cda23f53.png',
    arm: 'https://www.creepz.co/static/media/hellyeahArm.570273e4.png',
    gunhand: 'https://www.creepz.co/static/media/hellyeahGunhand.48feff0b.png',
    hand: 'https://www.creepz.co/static/media/hellyeahHand.5a734e36.png',
  },
  rainbow: {
    name: 'Rainbow',
    preview: 'https://www.creepz.co/static/media/RAINBOW.7a593ac5.png',
    closed: 'https://www.creepz.co/static/media/RAINBOW_CLOSED.1ee63816.png',
    arm: 'https://www.creepz.co/static/media/rainbowArm.70bb81fa.png',
    gunhand: 'https://www.creepz.co/static/media/rainbowGunhand.0654fd43.png',
    hand: 'https://www.creepz.co/static/media/rainbowHand.5db982a4.png',
  },
  gold: {
    name: 'Gold',
    preview: 'https://www.creepz.co/static/media/GOLD.67317993.png',
    closed: 'https://www.creepz.co/static/media/GOLD_CLOSED.c16700dd.png',
    arm: 'https://www.creepz.co/static/media/goldArm.7abeabf5.png',
    gunhand: 'https://www.creepz.co/static/media/goldGunhand.ce1f4a53.png',
    hand: 'https://www.creepz.co/static/media/goldHand.7210a82c.png',
  },
};

interface IProps {}
const IDBuilder: React.FunctionComponent<IProps> = () => {
  const { data } = useSWR<Response>(`/api/traits`, fetcher);
  const [selectedSkin, setSkin] = useState<SkinOptions>('grey');
  const [selectedTraits, setTraits] = useState<Record<string, string>>({
    'Upper Gun': '',
    'Left Eye': 'https://www.creepz.co/static/media/defaultLEye.e9f1599b.png',
    'Right Eye': 'https://www.creepz.co/static/media/defaultREye.e4306f18.png',
    'Arm Detail': '',
    'Backpack Accessories': '',
    Mouth: '',
    'Lower Gun': '',
    Sight: 'https://www.creepz.co/static/media/defaultSight.3b5d99ce.png',
    Muzzle: 'https://www.creepz.co/static/media/defaultMazzle.0a5451e3.png',
    'Magazine (Gun Clip)':
      'https://www.creepz.co/static/media/defaultMagazine.475bde45.png',
    Tail: '',
    Backpack: 'https://www.creepz.co/static/media/defaultBackpack.98d52a66.png',
    Hair: 'https://www.creepz.co/static/media/defaultHair.0eb00f4e.png',
    'Backpack Straps':
      'https://www.creepz.co/static/media/defaultBackpackStripes.f2c2281a.png',
    Wrist: 'https://www.creepz.co/static/media/defaultWrist.59f83c0c.png',
  });

  const updateTrait = (trait: string, value: string) => {
    setTraits({ ...selectedTraits, [trait]: value });
  };

  if (!data) return <div>Loading...</div>;
  const traitData = data.data as Record<string, Trait[]>;
  return (
    <div className="mt-12">
      <dl className="mt-5 grid grid-cols-1 gap-5 gap-y-12">
        <GlowyBox title="ID Builder" isLoading={false} color="pink">
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-5 gap-y-12">
              <div
                className="w-96 h-96 relative"
                style={{
                  backgroundImage: `url(data:image/jpeg;base64,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)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              >
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits.Backpack}
                  alt="Backpack"
                />
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits['Right Eye']}
                  alt="Right Eye"
                />
                <img
                  className="w-96 h-96 absolute top-0"
                  src={skinDetails[selectedSkin].closed}
                  alt="Skin Base"
                />

                {selectedTraits.Tails && (
                  <img
                    className="w-96 h-96 absolute top-0"
                    src={selectedTraits.Tails}
                    alt="Tails"
                  />
                )}
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits.Hair}
                  alt="Hair"
                />
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits['Backpack Straps']}
                  alt="BackpackStripes"
                />
                {selectedTraits['Upper Gun'] && (
                  <img
                    className="w-96 h-96 absolute top-0"
                    src={selectedTraits['Upper Gun']}
                    alt="Upper Gun"
                  />
                )}
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits['Left Eye']}
                  alt="Left Eye"
                />
                {selectedTraits.Mouth && (
                  <img
                    className="w-96 h-96 absolute top-0"
                    src={selectedTraits.Mouth}
                    alt="Mouth"
                  />
                )}
                {selectedTraits['Lower Gun'] && (
                  <img
                    className="w-96 h-96 absolute top-0"
                    src={selectedTraits['Lower Gun']}
                    alt="Lower Gun"
                  />
                )}
                {selectedTraits['Backpack Accessories'] && (
                  <img
                    className="w-96 h-96 absolute top-0"
                    src={selectedTraits['Backpack Accessories']}
                    alt="Backpack Accessories"
                  />
                )}
                <img
                  className="w-96 h-96 absolute top-0"
                  src={skinDetails[selectedSkin].arm}
                  alt="Arm"
                />
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits.Wrist}
                  alt="Wrist"
                />
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits['Magazine (Gun Clip)']}
                  alt="Magazine"
                />
                {selectedTraits['Arm Detail'] && (
                  <img
                    className="w-96 h-96 absolute top-0"
                    src={selectedTraits['Arm Detail']}
                    alt="Arm Detail"
                  />
                )}
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits.Muzzle}
                  alt="Muzzle"
                />
                <img
                  className="w-96 h-96 absolute top-0"
                  src={selectedTraits.Sight}
                  alt="Sight"
                />

                <img
                  className="w-96 h-96 absolute top-0"
                  src={skinDetails[selectedSkin].gunhand}
                  alt="Gun Hand"
                />
                <img
                  className="w-96 h-96 absolute top-0"
                  src={skinDetails[selectedSkin].hand}
                  alt="Hand"
                />
              </div>
              <div>
                <Collapsable title="Skin">
                  <ul
                    role="list"
                    className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                  >
                    {Object.entries(skinDetails).map(([skinName, skin]) => (
                      <li key={skinName} className="relative">
                        <button
                          className={`${
                            selectedSkin === skinName
                              ? 'border-creepz-pink'
                              : 'border-creepz-purple-dark'
                          } border group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden relative`}
                          onClick={() => setSkin(skinName as SkinOptions)}
                        >
                          <div
                            style={{
                              backgroundImage: `url(https://d33wubrfki0l68.cloudfront.net/static/media/096f45b9a84663a6b6820c85efdeafec4d883174/idshadow.8537e1bf.jpg)`,
                              backgroundSize: 'cover',
                            }}
                          >
                            <img
                              className="h-full w-full object-cover"
                              src={skin.preview}
                              alt="Creepz Invasion Grounds"
                            />
                          </div>
                        </button>
                        <p className="mt-2 block text-sm text-left font-medium text-creepz-pink creepz-pink-glowy-text truncate ">
                          {skin.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Collapsable>
                {Object.entries(traitData).map(([category, traits]) => (
                  <Collapsable key={category} title={category}>
                    <ul
                      role="list"
                      className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                    >
                      {traits.map((trait: Trait) => (
                        <li key={trait.name} className="relative">
                          <button
                            className={`${
                              selectedTraits[category] === trait.image
                                ? 'border-creepz-pink'
                                : 'border-creepz-purple-dark'
                            } border group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden relative`}
                            onClick={() => updateTrait(category, trait.image)}
                          >
                            <div
                              style={{
                                backgroundImage: `url(https://d33wubrfki0l68.cloudfront.net/static/media/096f45b9a84663a6b6820c85efdeafec4d883174/idshadow.8537e1bf.jpg)`,
                                backgroundSize: 'cover',
                              }}
                            >
                              <img
                                className="h-full w-full object-cover"
                                src={trait.image}
                                alt="Creepz Invasion Grounds"
                              />
                            </div>
                          </button>
                          <p className="mt-2 block text-sm text-left font-medium text-creepz-pink creepz-pink-glowy-text truncate ">
                            {trait.name}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Collapsable>
                ))}
              </div>
            </div>
          </div>
        </GlowyBox>
      </dl>
    </div>
  );
};

export default IDBuilder;
