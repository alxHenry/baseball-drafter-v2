import { getMockPlayerData } from "../../data/mock";
import DraftPlayerList from "./components/DraftPlayerList";
import styles from "./Draft.module.css";
import TeamDisplay from "./components/TeamDisplay";
import { transformServerPlayerToLocalPlayer } from "../transforms/serverPlayerToLocalPlayer";

export default async function Page() {
  const battersById = await getMockPlayerData();
  const transformedBatterById = transformServerPlayerToLocalPlayer(battersById);

  return (
    <>
      <h1 className={styles.header}>Draft</h1>
      <div className={styles.draftContainer}>
        <div className={styles.column}>Your team</div>
        <div className={styles.column}>Available Players</div>
        <div className={`${styles.column} ${styles.actions}`}>Actions</div>
      </div>
      <DraftPlayerList battersById={transformedBatterById} />
      <TeamDisplay />
    </>
  );
}
