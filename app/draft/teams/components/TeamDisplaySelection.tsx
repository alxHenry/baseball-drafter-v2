"use client";

import { ChangeEventHandler, FC, useCallback, useMemo, useState } from "react";
import shallow from "zustand/shallow";
import { getTeamIdAndNameTuple } from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";

const ELEM_ID = "team-selection";

const TeamDisplaySelection: FC = () => {
  const teamNamesAndIds = useStore(getTeamIdAndNameTuple, shallow);
  const selectedTeamId = useStore((store) => store.teamsSlice.teamDisplaySelectedId);
  const setSelectedTeamId = useStore((store) => store.teamsSlice.setTeamDisplaySelectedTeam);

  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (ev) => {
      setSelectedTeamId(ev.currentTarget.value);
    },
    [setSelectedTeamId]
  );
  const optionElems = useMemo(
    () =>
      teamNamesAndIds.map(([id, teamName]) => (
        <option key={id} value={id}>
          {teamName}
        </option>
      )),
    [teamNamesAndIds]
  );

  return (
    <div>
      <label htmlFor={ELEM_ID}>Select Team: </label>
      <select id={ELEM_ID} onChange={onChange} value={selectedTeamId}>
        {optionElems}
      </select>
    </div>
  );
};

export default TeamDisplaySelection;
