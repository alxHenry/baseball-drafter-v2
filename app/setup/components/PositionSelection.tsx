import type { FC } from "react";
import shallow from "zustand/shallow";

import { useStore } from "../../../data/stores/store";
import { PositionId } from "../../../data/types/positions";
import PositionSelectionInput from "./PositionSelectionInput";

interface Props {}

const PositionSelection: FC<Props> = () => {
  const positions = useStore((state) => Object.keys(state.setupSlice.positionCounts), shallow);
  const positionSelectionInputs = positions.map((positionId) => (
    <PositionSelectionInput key={positionId} position={positionId as PositionId} />
  ));

  return <div>{positionSelectionInputs}</div>;
};

export default PositionSelection;
