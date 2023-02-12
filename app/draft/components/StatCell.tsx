import type { FC } from "react";

import { memo } from "react";
import { Cell } from "@table-library/react-table-library";
import StatDisplayValue from "./StatDisplayValue";
import { Stat } from "../../../data/types/stats";

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
