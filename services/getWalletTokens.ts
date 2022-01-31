import { formatUnits } from '@ethersproject/units';
import Web3 from 'web3';

import {
  address as invasionAddress,
  abi as invasionABI,
} from 'contracts/CreepzInvasionGrounds/CreepzInvasionGrounds';
import subgraphClient from 'services/subgraph/client';
import { TokensQuery } from 'services/subgraph/queries';
import type {
  TokensQueryResponse,
  TokensQueryVariables,
} from 'services/subgraph/queries';

export type Tokens = {
  creeps: string[];
  armouries: string[];
  shapeshifters: string[];
  megaShapeshifters: string[];
};

export type WalletTokens = {
  creeps: {
    staked: string[];
    unstaked: string[];
  };
  armouries: {
    staked: string[];
    unstaked: string[];
  };
  shapeshifters: string[];
  megaShapeshifters: string[];
};

const web3 = new Web3(process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT);
const stakingContract = new web3.eth.Contract(invasionABI, invasionAddress);

const getUnstakedTokens = async (address: string): Promise<Tokens> => {
  const { data } = await subgraphClient
    .query<TokensQueryResponse, TokensQueryVariables>(TokensQuery, {
      ownerId: address.toLowerCase(),
    })
    .toPromise();

  return data?.owners && data.owners[0]
    ? {
        creeps: data.owners[0].creeps.map((creep) => creep.id),
        armouries: data.owners[0].armouries.map((armoury) => armoury.id),
        shapeshifters: data.owners[0].shapeshifters.map(
          (shapeshifter) => shapeshifter.id
        ),
        megaShapeshifters: data.owners[0].megaShapeShifters.map(
          (megaShapeshifters) => megaShapeshifters.id
        ),
      }
    : {
        creeps: [],
        armouries: [],
        shapeshifters: [],
        megaShapeshifters: [],
      };
};

const getStakedTokens = async (
  address: string
): Promise<Omit<Tokens, 'shapeshifters' | 'megaShapeshifters'>> => {
  const rawStakedTokens = await stakingContract.methods
    .getStakerTokens(address)
    .call();

  return {
    creeps: rawStakedTokens[0].map((t: string) => formatUnits(t, 0)),
    armouries: rawStakedTokens[0].map((t: string) => formatUnits(t, 0)),
  };
};

const getWalletTokens = async (address: string): Promise<WalletTokens> => {
  const [unstakedTokens, stakedTokens] = await Promise.all([
    getUnstakedTokens(address),
    getStakedTokens(address),
  ]);
  return {
    creeps: {
      staked: stakedTokens.creeps,
      unstaked: unstakedTokens.creeps,
    },
    armouries: {
      staked: stakedTokens.armouries,
      unstaked: unstakedTokens.armouries,
    },
    shapeshifters: unstakedTokens.shapeshifters,
    megaShapeshifters: unstakedTokens.megaShapeshifters,
  };
};

export default getWalletTokens;
