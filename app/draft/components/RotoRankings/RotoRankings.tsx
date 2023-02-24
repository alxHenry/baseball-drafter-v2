"use client";

import { Body, Cell, Header, HeaderCell, HeaderRow, Row, Table } from "@table-library/react-table-library";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/chakra-ui";
import { useTheme } from "@table-library/react-table-library/theme";
import { FC, memo } from "react";
import { useDerivedRotoRankings, type RotoRankings } from "../../../../data/state/useDerivedRotoRankings";
import { useStore } from "../../../../data/stores/store";
import {
  BatterStatId,
  isBatterStat,
  isPitcherStat,
  PitcherStatId,
  RequiredStatId,
  StatId,
} from "../../../../data/types/stats";

interface TeamRotoRankings {
  readonly id: string;
  readonly name: string;
  readonly rotoRankings: RotoRankings;
}

interface Props {}

const STAT_TYPE_SORT_ORDER = { batter: 0, pitcher: 1, required: 2 };

const RotoRankings: FC<Props> = () => {
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const tableTheme = useTheme(chakraTheme);

  const batterStats = useStore((state) => state.draftSlice.batterStatConfigsById);
  const pitcherStats = useStore((state) => state.draftSlice.pitcherStatConfigsById);
  const requiredStats = useStore((state) => state.draftSlice.requiredStatConfigsById);

  const rotoRankingsById = useDerivedRotoRankings();
  const firstTeam = Object.keys(rotoRankingsById)[0];
  const filteredAndSortedStatIds = Object.keys(rotoRankingsById[firstTeam])
    .reduce<string[]>((agg, statId) => {
      const isDisplayedBatterStat =
        batterStats[statId as BatterStatId] != null && batterStats[statId as BatterStatId]?.isDisplayed === true;
      const isDisplayedPitcherStat =
        pitcherStats[statId as PitcherStatId] != null && pitcherStats[statId as PitcherStatId]?.isDisplayed === true;
      const isDisplayedRequiredStat =
        requiredStats[statId as RequiredStatId] != null &&
        requiredStats[statId as RequiredStatId]?.isDisplayed === true;

      if (isDisplayedBatterStat || isDisplayedPitcherStat || isDisplayedRequiredStat) {
        agg.push(statId);
      }

      return agg;
    }, [])
    .sort((a, b) => {
      const aSortValue = isBatterStat(a as StatId) === true ? 0 : isPitcherStat(a as StatId) === true ? 1 : 2;
      const bSortValue = isBatterStat(b as StatId) === true ? 0 : isPitcherStat(b as StatId) === true ? 1 : 2;
      return aSortValue - bSortValue;
    });

  const teamRotoRankings: TeamRotoRankings[] = Object.entries(rotoRankingsById).map(([teamId, rankingsByStatId]) => {
    return {
      id: teamId,
      name: "Test",
      rotoRankings: rankingsByStatId,
    };
  }, []);

  const headers = ["Name", ...filteredAndSortedStatIds, "Total"].map((statId) => (
    <HeaderCell key={statId}>{statId}</HeaderCell>
  ));

  return (
    <Table data={{ nodes: teamRotoRankings }} theme={tableTheme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>{headers}</HeaderRow>
          </Header>
          <Body>
            {(tableList as TeamRotoRankings[]).map((item) => {
              // Iterate through properly ordered and filtered list then pull out of our team's rankings
              let rotoTotal = 0;
              const renderedStatCells = filteredAndSortedStatIds.map((statId) => {
                const tuple = item.rotoRankings[statId as StatId]!;
                const rank = tuple[0];
                const value = tuple[1];
                rotoTotal += rank;

                return <Cell key={statId}>{rank}</Cell>;
              });

              return (
                <Row key={item.id} item={item}>
                  <Cell>{item.name}</Cell>
                  {renderedStatCells}
                  <Cell>{rotoTotal}</Cell>
                </Row>
              );
            })}
          </Body>
        </>
      )}
    </Table>
  );
};

export default memo(RotoRankings);
