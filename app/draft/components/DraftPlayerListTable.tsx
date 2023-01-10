import type { Player } from "../../../data/stores/playersSlice";
import type { Pagination, SortFn } from "@table-library/react-table-library/types/index";

import { FC, memo, useMemo } from "react";
import { Body, Table } from "@table-library/react-table-library";
import DraftPlayerListTableRow from "./DraftPlayerListTableRow";
import { useTableHeaders } from "./useTableHeaders";
import { useTheme } from "@table-library/react-table-library/theme";
import { useSort } from "@table-library/react-table-library/sort";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/chakra-ui";
import { EMPTY_OBJECT } from "../../utils/emptyObject";
import { useTableSortFns } from "./useTableSortFns";

export type TableData = { nodes: Player[] };

interface Props {
  readonly data: TableData;
  readonly pagination: Pagination;
}

const DraftPlayerListTable: FC<Props> = ({ data, pagination }) => {
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const tableTheme = useTheme(chakraTheme);

  const headers = useTableHeaders(data.nodes);

  const sortFns = useTableSortFns(data);
  const sort = useSort(data, EMPTY_OBJECT, {
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
