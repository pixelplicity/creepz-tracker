import { Mainnet } from '@usedapp/core';

export const AppConfig = {
  site_name: 'Creepz Tracker',
  title: 'Creepz Tracker',
  description: 'Track the creepz invasion of earth',
  locale: 'en',
  supportedNetworks: [Mainnet.chainId],
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT,
  },
};
