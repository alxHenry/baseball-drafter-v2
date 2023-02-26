import type { FC } from "react";

import { memo } from "react";
import { useStore } from "../../../data/stores/store";
import { Stat } from "../../../data/types/stats";
import TableCell from "../../components/TableCell";

interface Props {
  readonly stat: Stat;
}

const StatCell: FC<Props> = ({ stat }) => {
  const showRelativeStatValue = useStore((state) => state.draftSlice.showRelativeStatValues);

  return <TableCell isShowingRel={showRelativeStatValue} rel={stat.rel} abs={stat.abs} />;
};

export default memo(StatCell);
