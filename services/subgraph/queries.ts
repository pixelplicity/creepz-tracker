import { gql } from '@urql/core';

/* Tokens */
export type TokensQueryResponse = {
  owners: {
    creeps: { id: string }[];
    shapeshifters: { id: string }[];
    megaShapeShifters: { id: string }[];
    armouries: { id: string }[];
  }[];
};
export type TokensQueryVariables = {
  ownerId: string;
};
export const TokensQuery = gql`
  query Tokens($ownerId: String!) {
    owners(where: { id: $ownerId }) {
      id
      creeps {
        id
      }
      shapeshifters {
        id
      }
      megaShapeShifters {
        id
      }
      armouries {
        id
      }
    }
  }
`;
