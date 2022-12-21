"use client";

import { useMyTeam } from "../../data/selectors/teams";

export default function TeamDisplay() {
  const myTeam = useMyTeam();

  return <div>My team: {myTeam.playerIds.join(", ")}</div>;
}
