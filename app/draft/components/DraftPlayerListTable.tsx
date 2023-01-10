import type { Player } from "../../../data/stores/playersSlice";
import type { Pagination } from "@table-library/react-table-library/types/index";

import { FC, memo, useCallback } from "react";
import { Body, Table } from "@table-library/react-table-library";
import DraftPlayerListTableRow from "./DraftPlayerListTableRow";
import { useTableHeaders } from "./useTableHeaders";
import { useTheme } from "@table-library/react-table-library/theme";
import { useSort } from "@table-library/react-table-library/sort";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/chakra-ui";

interface Props {
  readonly data: { nodes: Player[] };
  readonly pagination: Pagination;
}

const DraftPlayerListTable: FC<Props> = ({ data, pagination }) => {
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const tableTheme = useTheme(chakraTheme);

  const headers = useTableHeaders(data.nodes);
  const sort = useSort(
    data,
    {
      onChange: (action, state) => {
        console.log(action, state);
      },
    },
    {
      sortFns: {
        avg: (array) =>
          array.sort((a, b) => {
            const playerA = a as Player;
            const playerB = b as Player;

            return playerB.stats["avg"].rel - playerA.stats["avg"].rel;
          }),
        hr: (array) =>
          array.sort((a, b) => {
            const playerA = a as Player;
            const playerB = b as Player;

            return playerB.stats["hr"].rel - playerA.stats["hr"].rel;
          }),
      },
    }
  );

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
