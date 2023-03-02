import { PositionId } from "../../data/types/positions";

export const isPlayerPitcher = (playerPosition: PositionId) => playerPosition === "SP" || playerPosition === "RP";
