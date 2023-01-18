"use client";

import { FC } from "react";
import { useDerivedRotoRankings } from "../../../../data/state/useDerivedRotoRankings";

interface Props {}

const RotoRankings: FC<Props> = () => {
  const rotoRankingsById = useDerivedRotoRankings();
  return <div>Roto Rankings: {JSON.stringify(rotoRankingsById)}</div>;
};

export default RotoRankings;
