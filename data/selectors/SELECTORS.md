## Naming Convention

`<Area>Selectors.ts` - Allows for easy finding via file selector palette or via folder structure.

## Selectors Perf

Selectors here should pick the most specific item that is needed by the consuming component for perf reasons. This way if one property on a team changes that we don't care about it, our selector will not return a new reference and will not re-render the consuming component. If you select the entire team, then destruct properties off of it, any update to any property will create a new team object and cause re-renders you may not care about.

## Open Questions/thoughts

- Should all selectors be written in separate files to make it easier to refactore the store shape if you want to move something from one slice to another? A little more pain up front for a little more flexibility later.
