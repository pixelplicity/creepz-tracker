import web3 from 'web3';

export const isValidAddress = (address?: string | undefined): boolean => {
  if (!address) return false;
  return web3.utils.isAddress(address);
};
