import { Header, HeaderCell, HeaderRow } from "@table-library/react-table-library";
import { useMemo } from "react";
import { HeaderCellSort } from "@table-library/react-table-library/sort";
import { useStore } from "../../../data/stores/store";
import { StatConfig } from "../../../data/types/stats";

const filterDisplayableStats = (statConfig: StatConfig) => statConfig.isDisplayed === true;

const DEFAULT_HEADERS = [
  <HeaderCell key="name">Name</HeaderCell>,
  <HeaderCell key="team">Team</HeaderCell>,
  <HeaderCell key="position">Position</HeaderCell>,
];
const DRAFT_BUTTON = <HeaderCell key="draft-button" />;

export const useTableHeaders = () => {
  const batterStats = useStore((state) => state.draftSlice.batterStatConfigsById);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStatConfigsById);
  const requiredStats = useStore((state) => state.draftSlice.requiredStatConfigsById);
  const displayMode = useStore((state) => state.draftSlice.currentTableDisplayMode);

  return useMemo(() => {
    // TODO: Make this work if you don't have equal batter and pitcher stats (who does that?)
    const batterStatValues = Object.values(batterStats).filter(filterDisplayableStats);
    const pitcherStatValues = Object.values(pitcherStats).filter(filterDisplayableStats);
    const requiredStatValues = Object.values(requiredStats).filter(filterDisplayableStats);

    let lastIndex = -1;
    let statHeaders: React.ReactNode[] = [];
    for (let i = 0; i < Math.max(pitcherStatValues.length, batterStatValues.length); i++) {
      const batterStat = batterStatValues[i];
      const pitcherStat = pitcherStatValues[i];

      lastIndex = i;

      // TODO: All the defaulting in the case of an uneven number of batter and pitcher stats (unlikely) feels inelegant
      if (displayMode === "All") {
        const key = `${batterStat?.id ?? ""}/${pitcherStat?.id ?? ""}`;
        const display = `${batterStat?.display ?? ""}/${pitcherStat?.display ?? ""}`;

        statHeaders.push(<HeaderCell key={key}>{display}</HeaderCell>);
      } else if (displayMode === "Pitchers" && pitcherStat != null) {
        statHeaders.push(
          <HeaderCellSort key={pitcherStat.id} sortKey={pitcherStat.id}>
            {pitcherStat.display.toUpperCase()}
          </HeaderCellSort>
        );
      } else if (displayMode === "Batters" && batterStat != null) {
        statHeaders.push(
          <HeaderCellSort key={batterStat.id} sortKey={batterStat.id}>
            {batterStat.display.toUpperCase()}
          </HeaderCellSort>
        );
      }
    }

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
