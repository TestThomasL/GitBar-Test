/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HiddenPullRequest = {
  id: string;
  repoName: string;
};

type InitialState = {
  hidden: HiddenPullRequest[];
};

const initialState: InitialState = {
  hidden: [],
};

export type DebugSettingsSlice = typeof initialState;

const settings = createSlice({
  name: "pullRequests",
  initialState,
  reducers: {
    setPullRequestHidden(state, action: PayloadAction<HiddenPullRequest>) {
      state.hidden = [...state.hidden, action.payload];
    },
    resetHiddenPullRequests(state) {
      state.hidden = [];
    },
  },
});

export const { setPullRequestHidden, resetHiddenPullRequests } =
  settings.actions;

export default settings.reducer;
