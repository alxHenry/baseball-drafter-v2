import { ChangeEventHandler, FC, useEffect, useMemo, useState } from "react";

interface Props {
  readonly numberOfTeams: number;
}

let LOCAL_ID_INCREMENTER = 0;

const TeamSetup: FC<Props> = ({ numberOfTeams }) => {
  const [teamNames, setTeamNames] = useState(new Array(numberOfTeams).fill("").map((_, index) => `Team-${index}`));
  const teamNamesLength = teamNames.length;

  // TODO: Hate this. How can we handle the changing number of teams and the concurrently rendered input fields without losing data?
  useEffect(() => {
    // When number of teams changes, modify the end of the array to the correct length
    if (numberOfTeams < teamNamesLength) {
      setTeamNames((prevTeamNames) => {
        return prevTeamNames.slice(0, numberOfTeams);
      });
      return;
    }

    // Add to list
    const newTeamsNeededCount = numberOfTeams - teamNamesLength;
    setTeamNames((prevTeamNames) => {
      const additionalTeamNames = new Array(newTeamsNeededCount)
        .fill("")
        .map((_, index) => `Team-${teamNamesLength + index}`);
      return [...prevTeamNames, ...additionalTeamNames];
    });
  }, [numberOfTeams, teamNamesLength]);

  const teamNameInputs = useMemo(
    () =>
      teamNames.map((teamName, index) => {
        const updateName: ChangeEventHandler<HTMLInputElement> = (ev) => {
          const newTeamName = ev.currentTarget.value;

          setTeamNames((prevTeamNames) => {
            prevTeamNames[index] = newTeamName;

            return [...prevTeamNames.slice(0, index), newTeamName, ...prevTeamNames.slice(index + 1)];
          });
        };

        const inputId = `team-name-input-${index}`;
        return (
          <div key={inputId}>
            <label htmlFor={inputId}>Name: </label>
            <input id={inputId} name={inputId} onChange={updateName} type="text" value={teamName}></input>
          </div>
        );
      }),
    [teamNames]
  );

  return <div>{teamNameInputs}</div>;
};

export default TeamSetup;
