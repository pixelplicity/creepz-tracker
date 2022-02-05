import { createAlchemyWeb3 } from '@alch/alchemy-web3';

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT);
export const isValidAddress = (address?: string | undefined): boolean => {
  if (!address) return false;
  return web3.utils.isAddress(address);
};
