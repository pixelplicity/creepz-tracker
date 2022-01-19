declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_INFURA_ID: string;
      NEXT_PUBLIC_INFURA_RINKEBY_ENDPOINT: string;
      NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT: string;
      NEXT_PUBLIC_THORGUARD_TOKEN_ADDRESS: string;
      NODE_ENV: 'development' | 'production';
    }
  }
  interface Window {
    ethereum?: any;
  }
}
export {};
