import { FC, memo } from "react";
import { getIsStatSelected } from "../../../data/selectors/draftSelectors";
import { useStore } from "../../../data/stores/store";
import { isRequiredStat, StatConfig } from "../../../data/types/stats";

interface Props {
  statConfig: StatConfig;
}

const StatSelectionInput: FC<Props> = ({ statConfig: { id, isDisplayed, display } }) => {
  const isStatSelected = useStore(getIsStatSelected(id));
  const toggleStatSelection = useStore((state) => state.draftSlice.toggleStatSelection);

  if (isDisplayed === false || isRequiredStat(id)) {
    return null;
  }

  const elementId = `stat-${id}`;
  return (
    <div key={elementId}>
      <label htmlFor={elementId}>{display}</label>
      <input
        id={elementId}
        name={elementId}
        type="checkbox"
        checked={isStatSelected}
        onChange={() => {
          toggleStatSelection(id);
        }}
      ></input>
    </div>
  );
};

export default memo(StatSelectionInput);
