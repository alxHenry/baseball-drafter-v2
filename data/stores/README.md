## Thoughts

Zustand is super interesting and very flexible. But I can't help that feel as things get more complex and actions affect multiple parts of the store, I end up building more things that look an awful lot like redux.

Right now the freedom allows me to willy nilly update different slices from one single action, but it wouldn't be easy in a large codebase to tell where writes to a slice are coming from exactly.
