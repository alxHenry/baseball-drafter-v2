import styles from "./TeamPlayersDisplay.module.css";

import { FC, memo, useMemo } from "react";
import { useStore } from "../../../../data/stores/store";
import { getCurrentPickingTeamId, getCurrentPickingTeamsPlayers } from "../../../../data/selectors/teamsSelectors";
import shallow from "zustand/shallow";
import PlayerStatDisplay from "./PlayerStatDisplay";

interface Props {}

const TeamPlayersDisplay: FC<Props> = () => {
  const players = useStore(getCurrentPickingTeamsPlayers);
  const currentPickingTeamId = useStore(getCurrentPickingTeamId);
  const currentTeamsStats = useStore((state) => state.teamsSlice.teamTotalStatsById[currentPickingTeamId], shallow);

  const playersRendered = useMemo(
    () =>
      players.map((player) => {
        const playerStats = Object.values(player.stats).map((stat) => {
          return <PlayerStatDisplay key={`${player.id}-${stat.id}`} stat={stat} />;
        });

        return (
          <div key={player.id} className={styles.listContainer}>
            <div className={styles.listCell}>Name: {player.name}</div>
            <div className={styles.listCell}>Team: {player.team}</div>
            {playerStats}
          </div>
        );
      }),
    [players]
  );

  const totalStatsRendered = useMemo(
    () =>
      Object.entries(currentTeamsStats).map(([key, value]) => {
        return <div key={key} className={styles.listCell}>{`${key}: ${value}`}</div>;
      }),
    [currentTeamsStats]
  );

  return (
    <div>
      <h2>Team Players</h2>
      {playersRendered}
      <div className={styles.listContainer}>{totalStatsRendered}</div>
    </div>
  );
};

export default memo(TeamPlayersDisplay);
