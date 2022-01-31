export type Stats = {
  date: string;
  id: string;
  bribes_paid: number;
  players: number;
  erc20_loomi: number;
  game_loomi: number;
  yield_loomi: number;
  spent_loomi: number;
  staked_creepz: number;
  staked_armouries: number;
  creepz: number;
  armouries: number;
};

export type GroupStats = {
  date: string;
  id: string;
  players: number;
  erc20_loomi: number;
  game_loomi: number;
  yield_loomi: number;
  spent_loomi: number;
  staked_creepz: number;
  staked_armouries: number;
  creepz: number;
  armouries: number;
};

export type Groups = {
  id: string;
  name: string;
  created_at: string;
  addresses: { name?: string; address: string }[];
};

export type Player = {
  date: string;
  id: string;
  name?: string;
  wallet_address: string;
  reward: number;
  yield: number;
  erc20_balance: number;
  spent: number;
  staked_creepz: string[] | null;
  unstaked_creepz: string[] | null;
  staked_armouries: string[] | null;
  unstaked_armouries: string[] | null;
  shapeshifters: string[] | null;
  megaShapeshifters: string[] | null;
  number_mega_shapeshifters: number;
  number_shapeshifters: number;
  number_staked_creepz: number;
  number_staked_armouries: number;
};
