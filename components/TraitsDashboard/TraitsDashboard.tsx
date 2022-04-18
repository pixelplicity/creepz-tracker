import React from 'react';

import useSWR from 'swr';

import Collapsable from 'components/ui/Collapsable/Collapsable';
import GlowyBox from 'components/ui/GlowyBox/GlowyBox';
import { Response } from 'pages/api/traits';
import fetcher from 'services/swrFetcher';
import { Trait } from 'types';

interface IProps {}
const BLEDashboard: React.FunctionComponent<IProps> = () => {
  const { data } = useSWR<Response>(`/api/traits`, fetcher);
  if (!data) return <div>Loading...</div>;
  const traitData = data.data as Record<string, Trait[]>;
  return (
    <div className="mt-12">
      <dl className="mt-5 grid grid-cols-1 gap-5 gap-y-12">
        <GlowyBox title="ID Traits" isLoading={false} color="pink">
          <div className="mt-2">
            <p className="text-creepz-pink text-right text-xs pb-4">
              Updated every 5 minutes
            </p>
            {Object.entries(traitData).map(([category, traits]) => (
              <Collapsable key={category} title={category}>
                <ul
                  role="list"
                  className="mt-2 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                >
                  {traits.map((trait: Trait) => (
                    <li key={trait.name} className="relative">
                      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden relative">
                        <div
                          style={{
                            backgroundImage: `url(https://d33wubrfki0l68.cloudfront.net/static/media/096f45b9a84663a6b6820c85efdeafec4d883174/idshadow.8537e1bf.jpg)`,
                            backgroundSize: 'cover',
                          }}
                        >
                          {trait.isShardPack && (
                            <div className="absolute top-2 right-2 text-creepz-blue">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="19"
                                viewBox="0 0 16 19"
                                fill="none"
                              >
                                <path
                                  d="M7.21501 1.07737L1.24742 8.55648C1.08741 8.7524 1 8.99759 1 9.25054C1 9.5035 1.08741 9.74869 1.24742 9.94461L7.21501 17.4237C7.27818 17.4992 7.35713 17.5598 7.4463 17.6015C7.53546 17.6431 7.63266 17.6647 7.73107 17.6647C7.82947 17.6647 7.92667 17.6431 8.01583 17.6015C8.105 17.5598 8.18395 17.4992 8.24712 17.4237L14.2147 9.94461C14.3747 9.74869 14.4621 9.5035 14.4621 9.25054C14.4621 8.99759 14.3747 8.7524 14.2147 8.55648L8.24712 1.07737C8.18395 1.00193 8.105 0.941259 8.01583 0.89963C7.92667 0.858 7.82947 0.836426 7.73107 0.836426C7.63266 0.836426 7.53546 0.858 7.4463 0.89963C7.35713 0.941259 7.27818 1.00193 7.21501 1.07737V1.07737Z"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M1 9.25195L4.92653 10.0156H10.5359L14.4624 9.25195"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M4.92969 10.0157L7.73435 0.840332L10.539 10.0157L7.73435 17.6661L4.92969 10.0157Z"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                          <img
                            className="h-full w-full object-cover"
                            src={trait.image}
                            alt="Creepz Invasion Grounds"
                          />
                        </div>
                      </div>
                      <p className="mt-2 block text-sm text-left font-medium text-creepz-pink creepz-pink-glowy-text truncate ">
                        {trait.name}
                      </p>
                      <p className="mt-1 block text-sm text-left font-medium text-creepz-pink truncate ">
                        Rarity: {trait.rarity}
                      </p>
                      <p className="mt-1 block text-sm text-left font-medium text-creepz-pink truncate ">
                        Remaining: {trait.remaining}/{trait.supply}
                      </p>
                    </li>
                  ))}
                </ul>
              </Collapsable>
            ))}
          </div>
        </GlowyBox>
      </dl>
    </div>
  );
};

export default BLEDashboard;
