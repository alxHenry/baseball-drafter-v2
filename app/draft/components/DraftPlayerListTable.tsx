import type { Player } from "../../../data/stores/playersSlice";
import type { Pagination } from "@table-library/react-table-library/types/index";

import { FC, memo } from "react";
import { Body, Table } from "@table-library/react-table-library";
import DraftPlayerListTableRow from "./DraftPlayerListTableRow";
import { useTableHeaders } from "./useTableHeaders";
import { useTheme } from "@table-library/react-table-library/theme";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/chakra-ui";

interface Props {
  readonly data: { nodes: Player[] };
  readonly pagination: Pagination;
}

const DraftPlayerListTable: FC<Props> = ({ data, pagination }) => {
  const headers = useTableHeaders(data.nodes);
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const tableTheme = useTheme(chakraTheme);

  return (
    <Table data={data} pagination={pagination} theme={tableTheme}>
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
