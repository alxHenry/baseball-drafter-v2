"use client";

import type { ChangeEventHandler, FC } from "react";

import { useStore } from "../../../data/stores/store";
import DraftConfigSubmit from "./DraftConfigSubmit";
import PositionSelection from "./PositionSelection";
import StatSelection from "./StatSelection";
import TeamSetup from "./TeamSetup";

interface Props {}

const DraftConfig: FC<Props> = () => {
  const changeSetupTeamCount = useStore((state) => state.teamsSlice.changeSetupTeamCount);
  const teamCount = useStore((state) => state.teamsSlice.setupTeamNames.length);

  const onNumberOfTeamsChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const newNumberOfTeams = parseInt(ev.currentTarget.value, 10);
    changeSetupTeamCount(newNumberOfTeams);
  };

  return (
    <div>
      <div>
        <label htmlFor="number-teams">Number of Teams:</label>
        <input
          id="number-teams"
          name="number-teams"
          aria-label="Select number of teams to draft"
          type="number"
          min={2}
          max={20}
          value={teamCount}
          onChange={onNumberOfTeamsChange}
        />
      </div>
      <TeamSetup />
      <PositionSelection />
      <StatSelection />
      <div>
        <DraftConfigSubmit />
      </div>
    </div>
  );
};

export default DraftConfig;
