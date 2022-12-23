import { createColumnHelper } from "@tanstack/react-table";
import type { BatterPlayerRow } from "../../../data/stores/playersSlice";
import DraftButton from "./DraftButton";

export const PAGE_SIZE = 10;
const columnHelper = createColumnHelper<BatterPlayerRow>();
export const columns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("avg", { header: "avg" }),
  columnHelper.accessor("hr", { header: "hr" }),
  columnHelper.display({
    id: "draft-button",
    cell: (props) => {
      if (props.row.original.draftedByTeamId !== null) {
        return;
      }
      return <DraftButton playerId={props.row.original.id} />;
    },
  }),
  columnHelper.accessor("draftedByTeamId", {}),
];
