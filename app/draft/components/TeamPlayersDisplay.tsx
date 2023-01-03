import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import { FC, memo } from "react";

interface Props {
  readonly players: BatterPlayerRow[];
}

const TeamPlayersDisplay: FC<Props> = ({ players }) => {
  const playersRendered = players.map((player) => {
    const playerStats = Object.values(player.stats).map((stat) => {
      return (
        <div key={stat.id}>
          {stat.display}: {stat.abs}
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

  return <div>{playersRendered}</div>;
};

export default memo(TeamPlayersDisplay);
