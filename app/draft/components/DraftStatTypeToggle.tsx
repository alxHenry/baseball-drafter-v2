"use client";

import type { FC } from "react";

import { useStore } from "../../../data/stores/store";

const INPUT_ID = "show-relative-stats-toggle";

interface Props {}

const DraftStatTypeToggle: FC<Props> = () => {
  const showRelativeStats = useStore((state) => state.draftSlice.showRelativeStatValues);
  const toggleRelativeStats = useStore((state) => state.draftSlice.toggleRelativeStats);

  return (
    <div>
      <label htmlFor={INPUT_ID}>Show relative stats: </label>
      <input id={INPUT_ID} name={INPUT_ID} type="checkbox" checked={showRelativeStats} onChange={toggleRelativeStats} />
    </div>
  );
};

export default DraftStatTypeToggle;
