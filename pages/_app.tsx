import 'styles/globals.css';
import { Mainnet, Config, DAppProvider } from '@usedapp/core';
import PlausibleProvider from 'next-plausible';
import { AppProps } from 'next/app';

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT,
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <PlausibleProvider domain="creepztracker.app">
      <DAppProvider config={config}>
        <Component {...pageProps} />
      </DAppProvider>
    </PlausibleProvider>
  );
};

export default MyApp;
