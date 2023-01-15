"use client";

import { FC } from "react";
import { useDerivedRotoRankings } from "../../../../data/state/useDerivedRotoRankings";

interface Props {}

const RotoRankings: FC<Props> = () => {
  const rotoRankingsById = useDerivedRotoRankings();
  console.log(rotoRankingsById);
  return <div>Roto Rankings</div>;
};

export default RotoRankings;
