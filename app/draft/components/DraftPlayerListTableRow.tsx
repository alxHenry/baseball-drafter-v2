import styles from "./DraftPlayerListTableRow.module.css";

import { Player } from "../../../data/stores/playersSlice";
import { FC, memo, useMemo } from "react";
import { Cell, Row } from "@table-library/react-table-library";
import DraftButton from "./DraftButton";
import StatCell from "./StatCell";
import { useStore } from "../../../data/stores/store";
import { getStatConfig } from "../../../data/types/statConfig";
import { BatterStatId, PitcherStatId, RequiredStatId, StatId } from "../../../data/types/stats";
import { isPlayerPitcher } from "../../../data/types/positions";

interface Props {
  item: Player;
}

const DraftPlayerListTableRow: FC<Props> = ({ item }) => {
  const batterStats = useStore((state) => state.draftSlice.batterStatConfigsById);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStatConfigsById);
  const requiredStats = useStore((state) => state.draftSlice.requiredStatConfigsById);

  const isDrafted = item.draftedByTeamId != null;

  // TODO: Support position array and shohei otani
  // TODO: Has to be a way to clean up this code duplication for generating stat cells with typescript safety
  const renderedStatCells = useMemo(() => {
    const requiredStatCells = Object.keys(requiredStats).map((stat) => {
      const config = getStatConfig(stat as StatId, batterStats, pitcherStats, requiredStats);
      if (config.isDisplayed === false) {
        return null;
      }

      // TODO: Why does typescript not know these are RequiredStatIds not strings? Is it because of Object.keys typings?
      const statId = stat as RequiredStatId;
      const statData = item.stats[statId]!;
      return <StatCell key={statData.id} stat={statData} />;
    });

    let playerStatCells = [];
    if (isPlayerPitcher(item.position)) {
      playerStatCells = Object.keys(pitcherStats).map((stat) => {
        const config = getStatConfig(stat as StatId, batterStats, pitcherStats, requiredStats);
        if (config.isDisplayed === false) {
          return null;
        }

        const statId = stat as PitcherStatId;
        const statData = item.stats[statId]!;
        return <StatCell key={statId} stat={statData} />;
      });
    } else {
      playerStatCells = Object.keys(batterStats).map((stat) => {
        const config = getStatConfig(stat as StatId, batterStats, pitcherStats, requiredStats);
        if (config.isDisplayed === false) {
          return null;
        }

        const statId = stat as BatterStatId;
        const statData = item.stats[statId]!;
        return <StatCell key={statId} stat={statData} />;
      });
    }

    return [...playerStatCells, ...requiredStatCells];
  }, [requiredStats, item.position, item.stats, pitcherStats, batterStats]);

  return (
    <Row key={item.id} item={item} className={isDrafted ? styles.strikethrough : ""}>
      <Cell>{item.name}</Cell>
      <Cell>{item.team}</Cell>
      <Cell>{item.position.join("/")}</Cell>
      {renderedStatCells}
      <Cell>{isDrafted ? null : <DraftButton playerId={item.id} />}</Cell>
    </Row>
  );
};

export default memo(DraftPlayerListTableRow);
