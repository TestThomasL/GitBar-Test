import { Attendee } from "./attendee";
import { ThemeColor } from "./theme";

export enum GroupPullRequestsBy {
  REPO = "repo",
  DATE = "date",
  NONE = "none",
}

export type PullRequest = {
  id: string;
  title: string;
  author: Attendee;
  repoId: string;
  repoName: string;
  reviewers: Attendee[];
  createdAt: string;
  url: string;
  amountOfComments?: number;
  isDraft: boolean;
  // Accent Color for the repository
  accentColor: ThemeColor;
  // User specific fields
  isApprovedByMe: boolean;
  isCommentedByMe: boolean;
  isAuthoredByMe: boolean;
  isAssignedToMe: boolean;
};
