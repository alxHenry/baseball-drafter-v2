import type { Player } from "../../../../data/stores/playersSlice";

import { FC, memo } from "react";
import StatDisplayValue from "../StatDisplayValue";

interface Props {
  readonly players: Player[];
}

const TeamPlayersDisplay: FC<Props> = ({ players }) => {
  const playersRendered = players.map((player) => {
    const playerStats = Object.values(player.stats).map((stat) => {
      return (
        <div key={stat.id}>
          {stat.display}: <StatDisplayValue stat={stat} />
        </div>
      );
    });

    return (
      <div key={player.id}>
        <div>Name: {player.name}</div>
        <div>Team: {player.team}</div>
        {playerStats}
      </div>
    );
  });

  return (
    <div>
      <h2>Team Players</h2>
      {playersRendered}
    </div>
  );
};

export default memo(TeamPlayersDisplay);
