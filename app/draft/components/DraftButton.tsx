import type { BatterPlayerRow } from "../../../data/stores/playersSlice";

import { useStore } from "../../../data/stores/store";
import { memo } from "react";

interface Props {
  playerId: BatterPlayerRow["id"];
}

const DraftButton = ({ playerId }: Props) => {
  const draftPlayer = useStore((state) => state.teamsSlice.draftPlayer);
  const advanceDraft = useStore((state) => state.draftSlice.advanceDraft);

  return (
    <button
      onClick={() => {
        draftPlayer(playerId);
        advanceDraft();
      }}
    >
      Draft!
    </button>
  );
};

export default memo(DraftButton);
