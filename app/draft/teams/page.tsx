import TeamDisplay from "../components/Team/TeamDisplay";
import TeamDisplaySelection from "./components/TeamDisplaySelection";

export default function Page() {
  return (
    <>
      <h1>Teams</h1>
      <TeamDisplaySelection />
      <TeamDisplay />
    </>
  );
}
