import { FC, memo } from "react";
import shallow from "zustand/shallow";
import { getTeamsPositionNeedsSelector } from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";

interface Props {
  teamId: string;
}

const TeamNeeds: FC<Props> = ({ teamId }) => {
  const positionToNeedCount = useStore(getTeamsPositionNeedsSelector(teamId), shallow);
  const teamNeedsRendered = Object.entries(positionToNeedCount).map(([position, count]) => {
    return (
      <div key={position}>
        {position}: {count}
      </div>
    );
  });

  return (
    <div>
      <h2>Team Needs</h2>
      {teamNeedsRendered}
    </div>
  );
};

export default memo(TeamNeeds);
