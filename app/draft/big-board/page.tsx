import DraftPlayerList from "../components/DraftPlayerList";
import DraftTracker from "../components/DraftTracker/DraftTracker";
import DraftStatTypeToggle from "../components/DraftStatTypeToggle";

export default async function Page() {
  return (
    <>
      <h1>Big Board</h1>
      <DraftTracker />
      <DraftStatTypeToggle />
      <DraftPlayerList />
    </>
  );
}
