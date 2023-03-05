import { FC, memo, useMemo } from "react";

import { useStore } from "../../../data/stores/store";
import {
  ALL_POSITION_KEY,
  BATTER_POSITION_KEY,
  PITCHER_POSITION_KEY,
  PositionId,
  TableDisplayMode,
} from "../../../data/types/positions";

interface Props {}

const DraftPlayerDisplayModeSelect: FC<Props> = () => {
  const currentDisplayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);
  const setTableDisplayMode = useStore((state) => state.draftSlice.setTableDisplayMode);

  const optionElems = useMemo(() => {
    const positionOptions = Object.keys(PositionId).map((position) => (
      <option key={position} value={position}>
        {position}
      </option>
    ));
    positionOptions.unshift(
      <option value={ALL_POSITION_KEY} key={ALL_POSITION_KEY}>
        {ALL_POSITION_KEY}
      </option>,
      <option value={BATTER_POSITION_KEY} key={BATTER_POSITION_KEY}>
        {BATTER_POSITION_KEY}
      </option>,
      <option value={PITCHER_POSITION_KEY} key={PITCHER_POSITION_KEY}>
        {PITCHER_POSITION_KEY}
      </option>
    );
    return positionOptions;
  }, []);

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
        {optionElems}
      </select>
    </div>
  );
};

export default memo(DraftPlayerDisplayModeSelect);
