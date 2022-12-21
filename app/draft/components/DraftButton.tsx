import { Row } from "@tanstack/react-table";
import { BatterPlayerRow } from "../../../data/transforms/player";
import { useTeamsStore } from "../../../data/stores/teamsStore";

interface Props {
  row: Row<BatterPlayerRow>;
}

const DraftButton = ({ row }: Props) => {
  const myTeamId = useTeamsStore((state) => state.userTeamId);
  const draftPlayer = useTeamsStore((state) => state.draftPlayer);

  return (
    <button
      onClick={() => {
        draftPlayer(myTeamId, row.original.id);
      }}
    >
      Draft!
    </button>
  );
};

export default DraftButton;
