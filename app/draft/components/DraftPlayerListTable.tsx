import type { BatterPlayerRow } from "../../../data/stores/playersSlice";
import type { Pagination } from "@table-library/react-table-library/types/index";

import { FC, memo } from "react";
import { Body, Header, HeaderCell, HeaderRow, Table } from "@table-library/react-table-library";
import DraftPlayerListTableRow from "./DraftPlayerListTableRow";

interface Props {
  readonly data: { nodes: BatterPlayerRow[] };
  readonly pagination: Pagination;
}

const HEADERS = (
  <Header>
    <HeaderRow>
      <HeaderCell>Name</HeaderCell>
      <HeaderCell>AVG</HeaderCell>
      <HeaderCell>HR</HeaderCell>
      <HeaderCell></HeaderCell>
    </HeaderRow>
  </Header>
);

const DraftPlayerListTable: FC<Props> = ({ data, pagination }) => {
  return (
    <Table data={data} pagination={pagination}>
      {(tableList) => (
        <>
          {HEADERS}
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
