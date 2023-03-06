"use client";

import { ReactNode, useRef } from "react";
import { PlayersById } from "../../../data/stores/playersSlice";
import { useStore } from "../../../data/stores/store";

const DraftPlayerHydrator = ({ children, playersById }: { children: ReactNode; playersById: PlayersById }) => {
  const hydratePlayers = useStore((store) => store.playersSlice.hydratePlayers);

  const initialized = useRef(false);
  if (!initialized.current) {
    hydratePlayers(playersById);

    initialized.current = true;
  }

  return <>{children}</>;
};

export default DraftPlayerHydrator;
