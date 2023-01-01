import { createSelector } from "reselect";

const selectDirectoy = state => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectoy],
  (directory) => directory.sections
);