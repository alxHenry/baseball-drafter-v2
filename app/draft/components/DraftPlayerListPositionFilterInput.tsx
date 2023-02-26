import { ChangeEventHandler, FC, memo, useMemo } from "react";
import { PositionId } from "../../../data/stores/setupSlice";

const ALL_VALUE = "All";
export type PositionFilterValue = PositionId | typeof ALL_VALUE;

const SELECT_ID = "position-filter";

interface Props {
  readonly filteredPosition: PositionFilterValue;
  readonly setPositionFilter: (value: PositionFilterValue) => void;
}

const DraftPlayerListPositionFilterInput: FC<Props> = ({ filteredPosition, setPositionFilter }) => {
  const onFilterSelect: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    setPositionFilter(ev.currentTarget.value as PositionFilterValue);
  };

  const optionElems = useMemo(() => {
    const positionOptions = Object.keys(PositionId).map((position) => <option key={position}>{position}</option>);
    positionOptions.push(<option>{ALL_VALUE}</option>);
    return positionOptions;
  }, []);

  return (
    <div>
      <label htmlFor={SELECT_ID}>Filter position: </label>
      <select id={SELECT_ID} value={filteredPosition} onChange={onFilterSelect}>
        {optionElems}
      </select>
    </div>
  );
};

export default memo(DraftPlayerListPositionFilterInput);
