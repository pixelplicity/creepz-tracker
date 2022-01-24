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
  staked_armouries: string[] | null;
  number_staked_creepz: number;
  number_staked_armouries: number;
};

export type LeaderboardResponse = {
  leaderboard: {
    game: Stats;
    players: Player[];
  };
};
