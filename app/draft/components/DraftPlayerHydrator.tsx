"use client";

import { ReactNode, useRef } from "react";
import { PlayersById } from "../../../data/stores/playersSlice";
import { useStore } from "../../../data/stores/store";

const DraftPlayerHydrator = ({ children, playersById }: { children: ReactNode; playersById: PlayersById }) => {
  console.log("Hydrator store:", useStore.getState());
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState((store) => ({
      ...store,
      playersSlice: {
        ...store.playersSlice,
        playersById,
      },
    }));
    initialized.current = true;
  }

  return <>{children}</>;
};

export default DraftPlayerHydrator;
