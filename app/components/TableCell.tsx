import { Cell } from "@table-library/react-table-library";
import { FC, memo } from "react";

interface Props {
  abs: number;
  isShowingRel: boolean;
  rel?: number;
  decimalPlaces?: number;
}

const TableCell: FC<Props> = ({ abs, isShowingRel, rel, decimalPlaces = 2 }) => {
  const value = isShowingRel ? rel ?? abs : abs;
  const isWholeNumber = value % 1 === 0;

  const displayValue = isWholeNumber ? value : value.toFixed(decimalPlaces);
  return <Cell>{displayValue}</Cell>;
};

export default memo(TableCell);
