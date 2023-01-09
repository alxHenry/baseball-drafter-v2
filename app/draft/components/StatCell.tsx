import type { FC } from "react";
import type { Stat } from "../../../data/stores/playersSlice";

import { memo } from "react";
import { Cell } from "@table-library/react-table-library";
import StatDisplayValue from "./StatDisplayValue";

interface Props {
  readonly stat: Stat;
}

const StatCell: FC<Props> = ({ stat }) => {
  return (
    <Cell>
      <StatDisplayValue stat={stat} />
    </Cell>
  );
};

export default memo(StatCell);
