"use client";

import { FC } from "react";
import { useStore } from "../../../data/stores/store";

interface Props {}

const DraftSaveButton: FC<Props> = () => {
  const saveDraft = useStore((store) => store.persist);

  return <button onClick={saveDraft}>Save</button>;
};

export default DraftSaveButton;
