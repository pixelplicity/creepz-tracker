declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_INFURA_ID: string;
      NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT: string;
      BITQUERY_API_KEY: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_KEY: string;
      NEXT_PUBLIC_GRAPH_URL: string;
      NEXT_PUBLIC_NAME_GRAPH_URL: string;
      NODE_ENV: 'development' | 'production';
    }
  }
  interface Window {
    ethereum?: any;
  }
}
export {};
