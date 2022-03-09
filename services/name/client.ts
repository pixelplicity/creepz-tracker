import { createClient } from '@urql/core';

export default createClient({
  url: process.env.NEXT_PUBLIC_NAME_GRAPH_URL,
});
