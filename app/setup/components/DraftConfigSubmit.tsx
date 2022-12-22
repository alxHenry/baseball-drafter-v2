"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { useTeamsStore } from "../../../data/stores/store";

const DraftConfigSubmit: FC = () => {
  const router = useRouter();

  const finalizeSetupTeams = useTeamsStore((state) => state.teamsSlice.finalizeSetupTeams);
  const startDraft = () => {
    finalizeSetupTeams();
    router.push("/draft");
  };

  return <button onClick={startDraft}>Start Draft!</button>;
};

export default DraftConfigSubmit;
