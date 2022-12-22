"use client";

import { FC, useState } from "react";
import { useTeamsStore } from "../../../data/stores/teamsStore";
import TeamSetup from "./TeamSetup";

const DEFAULT_TEAMS = 10;

interface Props {}

const DraftConfig: FC<Props> = () => {
  const setupNewEmptyTeams = useTeamsStore((state) => state.setupNewEmptyTeams);
  const [numberOfTeams, setNumberOfTeams] = useState(DEFAULT_TEAMS);

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
          value={numberOfTeams}
          onChange={(ev) => {
            const newNumberOfTeams = parseInt(ev.currentTarget.value, 10);
            setNumberOfTeams(newNumberOfTeams);
          }}
        />
      </div>
      <TeamSetup numberOfTeams={numberOfTeams} />
    </div>
  );
};

export default DraftConfig;
