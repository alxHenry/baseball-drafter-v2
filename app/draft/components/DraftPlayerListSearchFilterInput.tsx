import { FC, memo } from "react";

interface Props {
  readonly setSearchFilter: (newSearch: string) => void;
  readonly searchValue: string;
}

const DraftPlayerListSearchFilterInput: FC<Props> = ({ searchValue, setSearchFilter }) => {
  return (
    <div>
      <label htmlFor="player-search">Search players: </label>
      <input
        id="player-search"
        name="player-search"
        type="text"
        value={searchValue}
        onChange={(ev) => {
          setSearchFilter(ev.currentTarget.value);
        }}
      />
    </div>
  );
};

export default memo(DraftPlayerListSearchFilterInput);
