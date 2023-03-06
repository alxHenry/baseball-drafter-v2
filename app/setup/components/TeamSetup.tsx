import { ChangeEventHandler, FC, useEffect, useMemo, useState } from "react";
import { useStore } from "../../../data/stores/store";

interface Props {}

const TeamSetup: FC<Props> = () => {
  const setupTeamNames = useStore((state) => state.teamsSlice.setupTeamNames);
  const modifySetupTeam = useStore((state) => state.teamsSlice.modifySetupTeam);

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
  console.log(setupTeamNames);

  return <div>{teamNameInputs}</div>;
};

export default TeamSetup;
