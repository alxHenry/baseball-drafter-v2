import { ChangeEventHandler, FC, useEffect, useMemo, useState } from "react";
import { useTeamsStore } from "../../../data/stores/teamsStore";

interface Props {}

const TeamSetup: FC<Props> = () => {
  const setupTeamNames = useTeamsStore((state) => state.setupTeamNames);
  const modifySetupTeam = useTeamsStore((state) => state.modifySetupTeam);

  const teamNameInputs = useMemo(
    () =>
      setupTeamNames.map((teamName, index) => {
        const updateName: ChangeEventHandler<HTMLInputElement> = (ev) => {
          const newTeamName = ev.currentTarget.value;
          modifySetupTeam(index, newTeamName);
        };

        const inputId = `team-name-input-${index}`;
        return (
          <div key={inputId}>
            <label htmlFor={inputId}>Name: </label>
            <input id={inputId} name={inputId} onChange={updateName} type="text" value={teamName}></input>
          </div>
        );
      }),
    [modifySetupTeam, setupTeamNames]
  );

  return <div>{teamNameInputs}</div>;
};

export default TeamSetup;
