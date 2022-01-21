declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_INFURA_ID: string;
      NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT: string;
      BITQUERY_API_KEY: string;
      NODE_ENV: 'development' | 'production';
    }
  }
  interface Window {
    ethereum?: any;
  }
}
export {};
