import { ApolloClient } from "@apollo/client";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

import { AccountType } from "models/account";
import Profile, { AccountState } from "models/profile";

import Provider from "./provider";

abstract class BaseProvider implements Provider {
  id: string;

  auth: Record<string, string>;

  protected client?: ApolloClient<object>;

  protected profile?: Profile;

  protected userIdentifier: string;

  protected accountType: AccountType;

  constructor(
    id: string,
    auth: Record<string, string>,
    userIdentifier: string,
    accountType: AccountType,
  ) {
    this.id = id;
    this.auth = auth;
    this.userIdentifier = userIdentifier;
    this.accountType = accountType;
  }

  protected async query<TData, TVariables = { [key: string]: never }>(
    query: TypedDocumentNode<TData, TVariables>,
  ) {
    if (!this.client) {
      throw new Error("GraphQL client not initialized");
    }

    try {
      const result = await this.client.query<TData>({ query });
      return result.data;
    } catch (e: any) {
      throw new Error(
        `${this.accountType} ${this.userIdentifier}: ${e.message}`,
      );
    }
  }

  abstract getProfile(): Promise<Profile>;
  abstract getPullRequests(): Promise<any[]>;

  async getValidatedProfile(): Promise<Profile> {
    try {
      return await this.getProfile();
    } catch {
      return {
        id: this.id,
        name: this.userIdentifier,
        type: this.accountType,
        state: AccountState.Invalid,
      };
    }
  }

  async getNotifications(): Promise<any[]> {
    return [];
  }
}

export default BaseProvider;
