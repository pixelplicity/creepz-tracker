import 'styles/globals.css';
import { Mainnet, Config, DAppProvider } from '@usedapp/core';
import { AppProps } from 'next/app';

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT,
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <DAppProvider config={config}>
    <Component {...pageProps} />
  </DAppProvider>
);

export default MyApp;
