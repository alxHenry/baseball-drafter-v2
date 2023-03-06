"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { useStore } from "../../../data/stores/store";

const DraftConfigSubmit: FC = () => {
  const router = useRouter();

  const finalizeSetupTeams = useStore((state) => state.teamsSlice.finalizeSetupTeams);
  const startDraft = () => {
    const teams = JSON.stringify(useStore.getState().teamsSlice.teamsById);
    finalizeSetupTeams();
    router.push("/draft/big-board");
  };

  return <button onClick={startDraft}>Start Draft!</button>;
};

export default DraftConfigSubmit;
