import { gql } from '@urql/core';

/* Tokens */
export type TokensNameQueryResponse = {
  owners: {
    creeps: { id: string; creepzName: string }[];
  }[];
};
export type TokensNameQueryVariables = {
  ownerId: string;
};
export const TokensNameQuery = gql`
  query Tokens($ownerId: String!) {
    owners(where: { id: $ownerId }) {
      id
      creeps(orderBy: counter) {
        id
        creepzName
      }
    }
  }
`;
