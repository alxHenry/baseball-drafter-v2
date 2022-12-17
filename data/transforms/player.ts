import { Player } from "../../types/Players";

export interface BatterPlayerRow {
  avg: number;
  name: string;
  hr: number;
}
export const transformPlayerToRow = (player: Player): BatterPlayerRow => {
  return {
    avg: player.stats["avg"].value,
    name: player.name,
    hr: player.stats["hr"].value,
  };
};
