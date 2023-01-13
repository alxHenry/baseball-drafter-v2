import { Player } from "../../../data/stores/playersSlice";
import { Action, Pagination, State } from "@table-library/react-table-library/types/index";
import { FC, memo, useMemo } from "react";
import { Body, Table } from "@table-library/react-table-library";
import DraftPlayerListTableRow from "./DraftPlayerListTableRow";
import { useTableHeaders } from "./useTableHeaders";
import { useTheme } from "@table-library/react-table-library/theme";
import { useSort } from "@table-library/react-table-library/sort";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/chakra-ui";
import { useTableSortFns } from "./useTableSortFns";
import { useStore } from "../../../data/stores/store";

export type TableData = { nodes: Player[] };

interface Props {
  readonly data: TableData;
  readonly pagination: Pagination;
}

const DraftPlayerListTable: FC<Props> = ({ data, pagination }) => {
  const setSortState = useStore((state) => state.tableSlice.setSortState);
  const currentSortKey = useStore((state) => state.tableSlice.currentSortKey);
  const isSortReversed = useStore((state) => state.tableSlice.isSortReversed);

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const tableTheme = useTheme(chakraTheme);

  const headers = useTableHeaders();
  const sortFns = useTableSortFns();
  const sortStateAndChange = useMemo(
    () => ({
      state: {
        sortKey: currentSortKey,
        reverse: isSortReversed,
      },
      onChange: (_action: Action, sortState: State) => {
        setSortState(sortState);
      },
    }),
    [currentSortKey, isSortReversed, setSortState]
  );
  const sort = useSort(data, sortStateAndChange, {
    sortFns,
  });

  return (
    <Table data={data} pagination={pagination} sort={sort} theme={tableTheme}>
      {(tableList) => (
        <>
          {headers}
          <Body>
            {tableList.map((item) => (
              <DraftPlayerListTableRow key={item.id} item={item as Player} />
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default memo(DraftPlayerListTable);
