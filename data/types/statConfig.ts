import { statConfigsById } from "./statConfigsById";
import { BatterStatId, isBatterStat, isPitcherStat, PitcherStatId, RequiredStatId, StatConfig, StatId } from "./stats";

export type BatterStatConfigsById = Partial<Record<BatterStatId, StatConfig>>;
export type PitcherStatConfigsById = Partial<Record<PitcherStatId, StatConfig>>;
export type RequiredStatConfigsById = Record<RequiredStatId, StatConfig>;

export const getStatConfig = (
  statId: StatId,
  batterStatsById: BatterStatConfigsById,
  pitcherStatsById: PitcherStatConfigsById,
  requiredStatsById: RequiredStatConfigsById
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

const defaultSelectedBatterStats: StatId[] = ["avg", "rbi", "r", "sb", "hr"];
const requiredBatterTabulationStats: StatId[] = ["ab", "h", "bb", "hbp", "sf", "1b", "2b", "3b", "ibb"];
export const defaultBatterStatConfigsById = generateStatConfigById<BatterStatConfigsById>([
  ...defaultSelectedBatterStats,
  ...requiredBatterTabulationStats,
]);

const defaultSelectedPitcherStats: StatId[] = ["w", "sv", "era", "whip", "so"];
const requiredPitcherTabulationStats: StatId[] = ["hAllowed", "bbAllowed", "er", "ip"]; // IP can also be selectable, but by default it is not selected
export const defaultPitcherStatConfigsById = generateStatConfigById<PitcherStatConfigsById>([
  ...defaultSelectedPitcherStats,
  ...requiredPitcherTabulationStats,
]);

export const requiredStatConfigsById = generateStatConfigById<RequiredStatConfigsById>(["worth", "aWorth"]);
