/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Appearance from "models/appearance";
import { GroupPullRequestsBy } from "models/pull-request";

const initialState = {
  allowNotifications: false,
  appearance: Appearance.Dark,
  groupPRsBy: GroupPullRequestsBy.REPO,
  hidePRsApprovedByMe: true,
  hidePRsAfterTwoMonths: true,
  hideDraftPRs: false,
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAllowNotifications(state, action: PayloadAction<boolean>) {
      state.allowNotifications = action.payload;
    },
    setHidePRsAfterTwoMonths(state, action: PayloadAction<boolean>) {
      state.hidePRsAfterTwoMonths = action.payload;
    },
    setGroupPRsBy(state, action: PayloadAction<GroupPullRequestsBy>) {
      state.groupPRsBy = action.payload;
    },
    setHidePRsApprovedByMe(state, action: PayloadAction<boolean>) {
      state.hidePRsApprovedByMe = action.payload;
    },
    setAppearance(state, action: PayloadAction<Appearance>) {
      state.appearance = action.payload;
    },
    setHideDraftPRs(state, action: PayloadAction<boolean>) {
      state.hideDraftPRs = action.payload;
    },
  },
});

export const {
  setAllowNotifications,
  setHidePRsAfterTwoMonths,
  setGroupPRsBy,
  setHidePRsApprovedByMe,
  setAppearance,
  setHideDraftPRs,
} = settings.actions;

export default settings.reducer;
