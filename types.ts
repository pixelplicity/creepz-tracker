export type FloorPrices = {
  creepz: number;
  armoury: number;
  shapeshifter: number;
  megaShapeshifter: number;
  vault: number;
};

export type LoomiPrice = {
  eth: number;
  usd: number;
};

export type TraitType =
  | 'Left Eye'
  | 'Right Eye'
  | 'Arm Detail'
  | 'Backpack Accessories'
  | 'Lower Gun'
  | 'Upper Gun'
  | 'Muzzle'
  | 'Sight'
  | 'Mouth'
  | 'Magazine (Gun Clip)'
  | '';

export type Trait = {
  image: string;
  name: string;
  category: TraitType;
  supply: number;
  remaining: number;
  rarity: number;
  isShardPack: boolean;
  isOnSale: boolean;
};
