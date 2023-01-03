import type { BatterPlayerRow } from "../../../data/stores/playersSlice";
import type { Pagination } from "@table-library/react-table-library/types/index";

import { FC, memo } from "react";
import { Body, Table } from "@table-library/react-table-library";
import DraftPlayerListTableRow from "./DraftPlayerListTableRow";
import { useTableHeaders } from "./useTableHeaders";

interface Props {
  readonly data: { nodes: BatterPlayerRow[] };
  readonly pagination: Pagination;
}

const DraftPlayerListTable: FC<Props> = ({ data, pagination }) => {
  const headers = useTableHeaders(data.nodes);

  return (
    <Table data={data} pagination={pagination}>
      {(tableList) => (
        <>
          {headers}
          <Body>
            {tableList.map((item) => (
              <DraftPlayerListTableRow key={item.id} item={item as BatterPlayerRow} />
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default memo(DraftPlayerListTable);
