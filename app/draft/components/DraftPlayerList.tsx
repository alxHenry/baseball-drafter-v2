import { PlayersById } from "../../../types/Players";
import DraftPlayerRow from "./DraftPlayerRow";

interface Props {
  players: PlayersById;
}

const DraftPlayerList = ({ players }: Props) => {
  const playersElems = Object.values(players).map((player) => {
    return <DraftPlayerRow key={player.id} player={player} />;
  });

  return <div>{playersElems}</div>;
};

export default DraftPlayerList;
