import { statConfigsById } from "./statConfigsById";
import { BatterStatId, isBatterStat, isPitcherStat, PitcherStatId, RequiredStatId, StatConfig, StatId } from "./stats";

export type BatterStatById = Partial<Record<BatterStatId, StatConfig>>;
export type PitcherStatById = Partial<Record<PitcherStatId, StatConfig>>;
export type RequiredStatById = Record<RequiredStatId, StatConfig>;

export const getStatConfig = (
  statId: StatId,
  batterStatsById: BatterStatById,
  pitcherStatsById: PitcherStatById,
  requiredStatsById: RequiredStatById
) => {
  // TODO: Improve typings. We know it must be one of these and shouldn't have to use '!'
  if (isBatterStat(statId)) {
    return batterStatsById[statId]!;
  } else if (isPitcherStat(statId)) {
    return pitcherStatsById[statId]!;
  } else {
    return requiredStatsById[statId]!;
  }
};

const generateStatConfigById = <T>(statIds: StatId[]): T => {
  return statIds.reduce((agg, statId) => {
    agg[statId] = statConfigsById[statId];
    return agg;
  }, {} as any); // TODO: Could improve this typing with some fancy typescript
};
export const defaultBatterStatsById = generateStatConfigById<BatterStatById>([
  "avg",
  "rbi",
  "r",
  "sb",
  "hr",
  "ab",
  "h",
]);
export const defaultPitcherStatsById = generateStatConfigById<PitcherStatById>([
  "w",
  "sv",
  "era",
  "whip",
  "so",
  "hAllowed",
  "bbAllowed",
  "er",
  "ip",
]);
export const requiredStatsById = generateStatConfigById<RequiredStatById>(["worth", "aWorth"]);
