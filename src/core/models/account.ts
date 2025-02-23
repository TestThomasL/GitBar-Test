import { AzureAuth, GitHubAuth, GitLabAuth } from "./auth";

export enum AccountType {
  Azure = "Azure",
  GitHub = "GitHub",
  GitLab = "GitLab",
}

type DefaultAccount = {
  id: string;
  type: AccountType;
};

export type AzureAccount = DefaultAccount & {
  type: AccountType.Azure;
  auth: AzureAuth;
};

export type GitHubAccount = DefaultAccount & {
  type: AccountType.GitHub;
  auth: GitHubAuth;
};

export type GitLabAccount = DefaultAccount & {
  type: AccountType.GitLab;
  auth: GitLabAuth;
};

type Account = AzureAccount | GitHubAccount | GitLabAccount;

export default Account;
