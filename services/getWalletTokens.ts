import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { formatUnits } from '@ethersproject/units';

import {
  address as invasionAddress,
  abi as invasionABI,
} from 'contracts/CreepzInvasionGrounds/CreepzInvasionGrounds';
import {
  address as lordsAddress,
  abi as lordsABI,
} from 'contracts/LordsCo/LordsCo';
import nameClient from 'services/name/client';
import { TokensNameQuery } from 'services/name/queries';
import type {
  TokensNameQueryResponse,
  TokensNameQueryVariables,
} from 'services/name/queries';
import subgraphClient from 'services/subgraph/client';
import { TokensQuery } from 'services/subgraph/queries';
import type {
  TokensQueryResponse,
  TokensQueryVariables,
} from 'services/subgraph/queries';

export type CreepzName = {
  name: string;
  id: string;
};

export type Tokens = {
  creeps: string[];
  armouries: string[];
  vaults: string[];
  shapeshifters: string[];
  megaShapeshifters: string[];
};

export type WalletTokens = {
  creeps: {
    staked: string[];
    unstaked: string[];
    names: CreepzName[];
  };
  armouries: {
    staked: string[];
    unstaked: string[];
  };
  vaults: {
    staked: string[];
    unstaked: string[];
  };
  shapeshifters: string[];
  megaShapeshifters: string[];
};

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_INFURA_MAINNET_ENDPOINT);
const stakingContract = new web3.eth.Contract(invasionABI, invasionAddress);
const lordsContract = new web3.eth.Contract(lordsABI, lordsAddress);

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
        vaults: data.owners[0].vaults.map((vault) => vault.id),
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
        vaults: [],
        shapeshifters: [],
        megaShapeshifters: [],
      };
};

const getCreepzNames = async (address: string): Promise<CreepzName[]> => {
  const { data } = await nameClient
    .query<TokensNameQueryResponse, TokensNameQueryVariables>(TokensNameQuery, {
      ownerId: address.toLowerCase(),
    })
    .toPromise();
  return data?.owners[0]?.creeps.map((creep) => ({
    name: creep.creepzName,
    id: creep.id,
  })) as CreepzName[];
};

const getStakedTokens = async (
  address: string
): Promise<Omit<Tokens, 'shapeshifters' | 'megaShapeshifters'>> => {
  const rawStakedTokens = await stakingContract.methods
    .getStakerTokens(address)
    .call();
  const rawVaultTokens = await lordsContract.methods
    .getStakerTokens(address)
    .call();

  return {
    creeps: rawStakedTokens[0].map((t: string) => formatUnits(t, 0)),
    armouries: rawStakedTokens[1].map((t: string) => formatUnits(t, 0)),
    vaults: rawVaultTokens.map((t: string) => formatUnits(t, 0)),
  };
};

const getWalletTokens = async (address: string): Promise<WalletTokens> => {
  const [unstakedTokens, stakedTokens, creepzNames] = await Promise.all([
    getUnstakedTokens(address),
    getStakedTokens(address),
    getCreepzNames(address),
  ]);
  return {
    creeps: {
      staked: stakedTokens.creeps,
      unstaked: unstakedTokens.creeps,
      names: creepzNames,
    },
    armouries: {
      staked: stakedTokens.armouries,
      unstaked: unstakedTokens.armouries,
    },
    vaults: {
      staked: stakedTokens.vaults,
      unstaked: unstakedTokens.vaults,
    },
    shapeshifters: unstakedTokens.shapeshifters,
    megaShapeshifters: unstakedTokens.megaShapeshifters,
  };
};

export default getWalletTokens;
