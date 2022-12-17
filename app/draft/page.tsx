import { getMockPlayerData } from "../../data/mock";
import { transformPlayerToRow } from "../../data/transforms/player";
import DraftPlayerList from "./components/DraftPlayerList";
import styles from "./Draft.module.css";

export default async function Page() {
  const players = await getMockPlayerData();
  const playerRows = Object.values(players).map(transformPlayerToRow);

  return (
    <>
      <h1 className={styles.header}>Draft</h1>
      <div className={styles.draftContainer}>
        <div className={styles.column}>Your team</div>
        <div className={styles.column}>Available Players</div>
        <div className={`${styles.column} ${styles.actions}`}>Actions</div>
      </div>
      <DraftPlayerList playerRows={playerRows} />
    </>
  );
}
