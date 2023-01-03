import type { FC } from "react";
import type { Stat } from "../../../data/stores/playersSlice";

import { memo } from "react";
import { Cell } from "@table-library/react-table-library";

interface Props {
  readonly stat: Stat;
}

const StatCell: FC<Props> = ({ stat }) => {
  return <Cell>{stat.abs}</Cell>;
};

export default memo(StatCell);
