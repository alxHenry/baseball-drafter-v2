import type { Player } from "../../../data/stores/playersSlice";

import { Header, HeaderCell, HeaderRow } from "@table-library/react-table-library";
import { useMemo } from "react";
import { HeaderCellSort } from "@table-library/react-table-library/sort";
import { useStore } from "../../../data/stores/store";
import { StatConfig } from "../../../data/stores/draftSlice";

const filterDisplayableStats = (statConfig: StatConfig) => statConfig.isDisplayed === true;

const DEFAULT_HEADERS = [
  <HeaderCell key="name">Name</HeaderCell>,
  <HeaderCell key="team">Team</HeaderCell>,
  <HeaderCell key="position">Position</HeaderCell>,
];
const DRAFT_BUTTON = <HeaderCell key="draft-button" />;

export const useTableHeaders = () => {
  const batterStats = useStore((state) => state.draftSlice.batterStatsById);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStatsById);
  const requiredStats = useStore((state) => state.draftSlice.requiredStatsById);
  const displayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);

  return useMemo(() => {
    // TODO: Make this work if you don't have equal batter and pitcher stats (who does that?)
    const batterStatValues = Object.values(batterStats).filter(filterDisplayableStats);
    const pitcherStatValues = Object.values(pitcherStats).filter(filterDisplayableStats);
    const requiredStatValues = Object.values(requiredStats).filter(filterDisplayableStats);

    const statHeaders = batterStatValues.map((batterStat, index) => {
      const pitcherStat = pitcherStatValues[index];

      if (displayMode === "All") {
        const key = `${batterStat.id}/${pitcherStat.id}`;
        const display = `${batterStat.display}/${pitcherStat.display}`;

        return <HeaderCell key={key}>{display}</HeaderCell>;
      } else if (displayMode === "Pitchers") {
        return (
          <HeaderCellSort key={pitcherStat.id} sortKey={pitcherStat.id}>
            {pitcherStat.display.toUpperCase()}
          </HeaderCellSort>
        );
      } else {
        return (
          <HeaderCellSort key={batterStat.id} sortKey={batterStat.id}>
            {batterStat.display.toUpperCase()}
          </HeaderCellSort>
        );
      }
    });
    const requiredStatHeaders = requiredStatValues.map((stat) => (
      <HeaderCellSort key={stat.id} sortKey={stat.id}>
        {stat.display}
      </HeaderCellSort>
    ));

    return (
      <Header>
        <HeaderRow>
          {DEFAULT_HEADERS}
          {statHeaders}
          {requiredStatHeaders}
          {DRAFT_BUTTON}
        </HeaderRow>
      </Header>
    );
  }, [batterStats, displayMode, pitcherStats, requiredStats]);
};
