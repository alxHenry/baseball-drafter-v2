import { Row } from "@tanstack/react-table";
import { BatterPlayerRow } from "../../../data/transforms/player";
import { useStore } from "../../../data/stores/store";

interface Props {
  row: Row<BatterPlayerRow>;
}

const DraftButton = ({ row }: Props) => {
  const draftPlayer = useStore((state) => state.teamsSlice.draftPlayer);
  const advanceDraft = useStore((state) => state.draftSlice.advanceDraft);

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
