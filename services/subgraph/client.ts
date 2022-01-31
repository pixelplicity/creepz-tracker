import { createClient } from '@urql/core';

export default createClient({
  url: process.env.NEXT_PUBLIC_GRAPH_URL,
});
