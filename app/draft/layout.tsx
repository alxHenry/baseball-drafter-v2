import Link from "next/link";
import { fetchServerPlayersWithCache } from "../../data/remote/fetchServerPlayersWithCache";
import DraftPlayerHydrator from "./components/DraftPlayerHydrator";

const TODO_CACHE_CONFIG_KEY = "ATC-default-9";

export default async function DraftLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const transformedPlayersById = await fetchServerPlayersWithCache(TODO_CACHE_CONFIG_KEY);

  return (
    <DraftPlayerHydrator playersById={transformedPlayersById}>
      <Link href={"/draft/big-board"}>Big Board</Link>
      <Link href={"/draft/roto-rankings"}>Roto Rankings</Link>
      <Link href={"/draft/teams"}>Teams</Link>
      <div>{children}</div>
    </DraftPlayerHydrator>
  );
}
