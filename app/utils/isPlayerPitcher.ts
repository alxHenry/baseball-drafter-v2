import { PositionId } from "../../data/stores/setupSlice";

export const isPlayerPitcher = (playerPosition: PositionId) => playerPosition === "SP" || playerPosition === "RP";
