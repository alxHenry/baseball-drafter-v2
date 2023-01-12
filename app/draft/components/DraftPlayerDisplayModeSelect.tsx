import type { TableDisplayMode } from "../../../data/stores/draftSlice";
import type { FC } from "react";

import { useStore } from "../../../data/stores/store";

interface Props {}

const DraftPlayerDisplayModeSelect: FC<Props> = () => {
  const currentDisplayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);
  const setTableDisplayMode = useStore((state) => state.draftSlice.setTableDisplayMode);

  return (
    <div>
      <label htmlFor="table-display-select">View: </label>
      <select
        name="Table view select"
        id="table-display-select"
        onChange={(ev) => {
          setTableDisplayMode(ev.target.value as TableDisplayMode);
        }}
        value={currentDisplayMode}
      >
        <option value="All">All</option>
        <option value="Batters">Batters</option>
        <option value="Pitchers">Pitchers</option>
      </select>
    </div>
  );
};

export default DraftPlayerDisplayModeSelect;
