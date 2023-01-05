import { getMockPlayerData } from "../../data/mock";
import DraftPlayerList from "./components/DraftPlayerList";
import styles from "./Draft.module.css";
import TeamDisplay from "./components/Team/TeamDisplay";
import { transformServerPlayerToLocalPlayer } from "../transforms/serverPlayerToLocalPlayer";
import DraftTracker from "./components/DraftTracker/DraftTracker";

export default async function Page() {
  const battersById = await getMockPlayerData();
  const transformedBatterById = transformServerPlayerToLocalPlayer(battersById);

  return (
    <>
      <h1 className={styles.header}>Draft</h1>
      <DraftTracker />
      <DraftPlayerList battersById={transformedBatterById} />
      <TeamDisplay />
    </>
  );
}
