/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import Account from "models/account";

export const accountsAdapter = createEntityAdapter({
  selectId: (account: Account) => account.id,
});

const initialState = accountsAdapter.getInitialState();

const accounts = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    upsertOneAccount: accountsAdapter.upsertOne,
    removeOneAccount: accountsAdapter.removeOne,
  },
});

export const { upsertOneAccount, removeOneAccount } = accounts.actions;

export default accounts.reducer;
