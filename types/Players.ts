export type PlayersById = Record<Player["id"], Player>;

export interface Player {
  id: string;
  name: string;
  team: string;
  stats: Stats;
}

export type Stats = Record<Stat["id"], Stat>;

export interface Stat {
  id: string;
  name: string;
  value: number;
  isHigherBetter: boolean;
}
