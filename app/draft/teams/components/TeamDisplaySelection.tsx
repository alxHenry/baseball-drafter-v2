"use client";

import { ChangeEventHandler, FC, useCallback, useMemo, useState } from "react";
import shallow from "zustand/shallow";
import { getTeamIdAndNameTuple } from "../../../../data/selectors/teamsSelectors";
import { useStore } from "../../../../data/stores/store";
import TeamDisplay from "../../components/Team/TeamDisplay";

const ELEM_ID = "team-selection";

const TeamDisplaySelection: FC = () => {
  const teamNamesAndIds = useStore(getTeamIdAndNameTuple, shallow);
  const [selectedId, setSelectedId] = useState(teamNamesAndIds[0][0]);

  const onChange: ChangeEventHandler<HTMLSelectElement> = useCallback((ev) => {
    setSelectedId(ev.currentTarget.value);
  }, []);
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
      <div>
        <label htmlFor={ELEM_ID}>Select Team: </label>
        <select id={ELEM_ID} onChange={onChange} value={selectedId}>
          {optionElems}
        </select>
      </div>
      <TeamDisplay teamId={selectedId} />
    </div>
  );
};

export default TeamDisplaySelection;
