import { getMockPlayerData } from "../../data/mock";
import DraftPlayerList from "./components/DraftPlayerList";
import styles from "./Draft.module.css";
import TeamDisplay from "./components/Team/TeamDisplay";
import { transformServerPlayerToLocalPlayer } from "../transforms/serverPlayerToLocalPlayer";
import DraftTracker from "./components/DraftTracker/DraftTracker";
import DraftStatTypeToggle from "./components/DraftStatTypeToggle";
import RotoRankings from "./components/RotoRankings/RotoRankings";

export default async function Page() {
  const playersById = await getMockPlayerData();
  const transformedPlayersById = transformServerPlayerToLocalPlayer(playersById);

  return (
    <>
      <h1 className={styles.header}>Draft</h1>
      <DraftTracker />
      <DraftStatTypeToggle />
      <DraftPlayerList playersById={transformedPlayersById} />
      <TeamDisplay />
      <RotoRankings />
    </>
  );
}
