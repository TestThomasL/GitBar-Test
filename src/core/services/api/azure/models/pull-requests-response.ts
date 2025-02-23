import { Thread } from "./thread-response";

export type PullRequestsResponse = {
  count: number;
  value: AzurePullRequest[];
};

export enum ReviewerVote {
  Approved = 10,
  ApprovedWithSuggestions = 5,
  NoVote = 0,
  Rejected = -10,
  WaitingForAuthor = -5,
}

export type AzurePullRequest = {
  repository: Repository;
  pullRequestId: number;
  codeReviewId: number;
  status: string;
  createdBy: CreatedBy;
  creationDate: string;
  title: string;
  description: string;
  sourceRefName: string;
  targetRefName: string;
  mergeStatus: string;
  mergeId: string;
  lastMergeSourceCommit: LastMergeSourceCommit;
  lastMergeTargetCommit: LastMergeTargetCommit;
  lastMergeCommit: LastMergeCommit;
  reviewers: Reviewer[];
  url: string;
  supportsIterations: boolean;
  isDraft: boolean;
  // Custom added field during transformation
  threads: Thread[];
};

type Repository = {
  id: string;
  name: string;
  url: string;
  project: Project;
};

type Project = {
  id: string;
  name: string;
  state: string;
};

type CreatedBy = {
  id: string;
  displayName: string;
  uniqueName: string;
  url: string;
  imageUrl: string;
};

export type LastMergeSourceCommit = {
  commitId: string;
  url: string;
};

export type LastMergeTargetCommit = {
  commitId: string;
  url: string;
};

export type LastMergeCommit = {
  commitId: string;
  url: string;
};

export type Reviewer = {
  reviewerUrl: string;
  vote: ReviewerVote;
  id: string;
  displayName: string;
  uniqueName: string;
  url: string;
  imageUrl: string;
};
