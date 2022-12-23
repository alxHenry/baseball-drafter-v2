import type { HeaderGroup } from "@tanstack/react-table";
import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import { FC, memo } from "react";
import { flexRender } from "@tanstack/react-table";

interface Props {
  readonly headerGroups: HeaderGroup<BatterPlayerRow>[];
}

const TableHeaders: FC<Props> = ({ headerGroups }) => {
  const headerElems = headerGroups.map((headerGroup) => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
        ))}
      </tr>
    );
  });

  return <>{headerElems}</>;
};

export default memo(TableHeaders);
