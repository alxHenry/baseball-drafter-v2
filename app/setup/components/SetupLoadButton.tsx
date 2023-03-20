"use client";

import { FC, useCallback } from "react";
import { useStore } from "../../../data/stores/store";
import { useRouter } from "next/navigation";

interface Props {}

const SetupLoadButton: FC<Props> = () => {
  const loadDraft = useStore((store) => store.rehydrateStore);
  const router = useRouter();

  const loadDraftAndNavigateToBigBoard = useCallback(() => {
    const success = loadDraft();
    if (success) {
      router.push("/draft/big-board");  
    }
  }, [loadDraft, router]);

  return <button onClick={loadDraftAndNavigateToBigBoard}>Load</button>;
};

export default SetupLoadButton;
