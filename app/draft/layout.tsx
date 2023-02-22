import Link from "next/link";
import { transformServerPlayerToLocalPlayer } from "../transforms/serverPlayerToLocalPlayer";
import DraftPlayerHydrator from "./components/DraftPlayerHydrator";

export default async function DraftLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const response = await fetch("http://localhost:3001/players");
  const playersById = await response.json();
  const transformedPlayersById = transformServerPlayerToLocalPlayer(playersById);

  return (
    <DraftPlayerHydrator playersById={transformedPlayersById}>
      <Link href={"/draft/big-board"}>Big Board</Link>
      <Link href={"/draft/roto-rankings"}>Roto Rankings</Link>
      <Link href={"/draft/teams"}>Teams</Link>
      <div>{children}</div>
    </DraftPlayerHydrator>
  );
}
