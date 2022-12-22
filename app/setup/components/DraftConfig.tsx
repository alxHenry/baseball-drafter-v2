"use client";

import { ChangeEventHandler, FC, useState } from "react";
import { DEFAULT_TEAMS_COUNT, useTeamsStore } from "../../../data/stores/teamsStore";
import TeamSetup from "./TeamSetup";

interface Props {}

const DraftConfig: FC<Props> = () => {
  const changeSetupTeamCount = useTeamsStore((state) => state.changeSetupTeamCount);
  const teamCount = useTeamsStore((state) => state.setupTeamNames.length);

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
          type="number"
          min={2}
          max={20}
          value={teamCount}
          onChange={onNumberOfTeamsChange}
        />
      </div>
      <TeamSetup />
    </div>
  );
};

export default DraftConfig;
