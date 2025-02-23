import { RootState } from "store/configure";

export const selectHiddenPullRequests = (state: RootState) =>
  state.pullRequests.hidden;

export const selectHiddenPullRequestIds = (state: RootState) =>
  state.pullRequests.hidden.map((pr) => pr.id);
