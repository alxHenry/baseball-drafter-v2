import { FC, memo } from "react";
import { useStore } from "../../../data/stores/store";
import { Stat } from "../../../data/types/stats";

interface Props {
  readonly stat: Stat;
}

const StatDisplayValue: FC<Props> = ({ stat }) => {
  const showRelativeStatValue = useStore((state) => state.draftSlice.showRelativeStatValues);

  return <div>{showRelativeStatValue ? stat.rel ?? stat.abs : stat.abs}</div>;
};

export default memo(StatDisplayValue);
