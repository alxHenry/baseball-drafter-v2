import styles from "./TeamPlayersDisplay.module.css";

import { FC, memo, useMemo } from "react";
import { useStore } from "../../../../data/stores/store";
import { getTeamsPlayersSelector, getTeamStatsSelector } from "../../../../data/selectors/teamsSelectors";
import shallow from "zustand/shallow";
import PlayerStatDisplay from "./PlayerStatDisplay";
import TeamTotalStatDisplay from "./TeamTotalStatDisplay";
import { StatId } from "../../../../data/types/stats";

interface Props {
  readonly teamId: string;
}

const TeamPlayersDisplay: FC<Props> = ({ teamId }) => {
  const players = useStore(getTeamsPlayersSelector(teamId)); // TODO: Fix this from re-rendering every store change
  const currentTeamsStats = useStore(getTeamStatsSelector(teamId), shallow);

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
        return <TeamTotalStatDisplay key={key} statId={key as StatId} statValue={value} />;
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
