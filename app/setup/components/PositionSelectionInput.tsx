import type { PositionId } from "../../../data/stores/setupSlice";
import type { FC } from "react";

import { useStore } from "../../../data/stores/store";

interface Props {
  position: PositionId;
}

const PositionSelectionInput: FC<Props> = ({ position }) => {
  const positionCount = useStore((state) => state.setupSlice.positionCounts[position]);
  const updatePositionCount = useStore((state) => state.setupSlice.updatePositionCount);

  const elementId = `${position}-count`;

  return (
    <div>
      <label htmlFor={elementId}>{position}</label>
      <input
        name={elementId}
        id={elementId}
        type="number"
        min={0}
        onChange={(ev) => {
          updatePositionCount(position, parseInt(ev.currentTarget.value, 10));
        }}
        value={positionCount}
      ></input>
    </div>
  );
};

export default PositionSelectionInput;
