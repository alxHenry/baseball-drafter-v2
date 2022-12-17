import styles from "./DraftPlayerRow.module.css";
import { Player } from "../../../types/Players";

interface Props {
  player: Player;
}

const DraftPlayerRow = ({ player }: Props) => {
  const stats = Object.values(player.stats).map(({ id: statId, name, value }) => {
    return <span key={`${player.id}-${statId}`} className={styles.statContainer}>{`${name} ${value}`}</span>;
  });
  return (
    <div>
      <span>{player.name}</span>
      {stats}
    </div>
  );
};

export default DraftPlayerRow;
