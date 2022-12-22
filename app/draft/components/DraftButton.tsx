import { Row } from "@tanstack/react-table";
import { BatterPlayerRow } from "../../../data/transforms/player";
import { useTeamsStore } from "../../../data/stores/store";

interface Props {
  row: Row<BatterPlayerRow>;
}

const DraftButton = ({ row }: Props) => {
  const draftPlayer = useTeamsStore((state) => state.teamsSlice.draftPlayer);
  const advanceDraft = useTeamsStore((state) => state.draftSlice.advanceDraft);

  return (
    <button
      onClick={() => {
        draftPlayer(row.original.id);
        advanceDraft();
      }}
    >
      Draft!
    </button>
  );
};

export default DraftButton;
