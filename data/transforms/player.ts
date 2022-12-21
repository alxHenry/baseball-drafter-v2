import { Player } from "../../types/Players";

export interface BatterPlayerRow {
  id: string;
  avg: number;
  name: string;
  hr: number;
}
export const transformPlayerToRow = (player: Player): BatterPlayerRow => {
  return {
    id: player.id,
    avg: player.stats["avg"].value,
    name: player.name,
    hr: player.stats["hr"].value,
  };
};
