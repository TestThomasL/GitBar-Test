/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment GitHubPullRequest on PullRequest {\n    id\n    title\n    author {\n      avatarUrl\n      login\n    }\n    repository {\n      nameWithOwner\n      id\n    }\n    reviewRequests(first: 5) {\n      nodes {\n        requestedReviewer {\n          ... on User {\n            name\n            login\n            avatarUrl\n          }\n        }\n      }\n    }\n    isDraft\n    createdAt\n    url\n    baseRef {\n      branchProtectionRule {\n        requiredApprovingReviewCount\n      }\n    }\n    reviewDecision\n    totalCommentsCount\n    reviews(first: 100, states: APPROVED) {\n      totalCount\n      nodes {\n        author {\n          login\n          avatarUrl\n        }\n        state\n      }\n    }\n    comments(first: 100) {\n      nodes {\n        author {\n          login\n        }\n      }\n    }\n  }\n":
    types.GitHubPullRequestFragmentDoc,
  '\n  query GetGithubPullRequests {\n    search(\n      first: 100\n      query: "type:pr involves:@me is:open archived:false"\n      type: ISSUE\n    ) {\n      nodes {\n        ... on PullRequest {\n          ...GitHubPullRequest\n        }\n      }\n    }\n  }\n':
    types.GetGithubPullRequestsDocument,
  "\n  query GetViewer {\n    viewer {\n      id\n      avatarUrl\n      login\n      name\n    }\n  }\n":
    types.GetViewerDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment GitHubPullRequest on PullRequest {\n    id\n    title\n    author {\n      avatarUrl\n      login\n    }\n    repository {\n      nameWithOwner\n      id\n    }\n    reviewRequests(first: 5) {\n      nodes {\n        requestedReviewer {\n          ... on User {\n            name\n            login\n            avatarUrl\n          }\n        }\n      }\n    }\n    isDraft\n    createdAt\n    url\n    baseRef {\n      branchProtectionRule {\n        requiredApprovingReviewCount\n      }\n    }\n    reviewDecision\n    totalCommentsCount\n    reviews(first: 100, states: APPROVED) {\n      totalCount\n      nodes {\n        author {\n          login\n          avatarUrl\n        }\n        state\n      }\n    }\n    comments(first: 100) {\n      nodes {\n        author {\n          login\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment GitHubPullRequest on PullRequest {\n    id\n    title\n    author {\n      avatarUrl\n      login\n    }\n    repository {\n      nameWithOwner\n      id\n    }\n    reviewRequests(first: 5) {\n      nodes {\n        requestedReviewer {\n          ... on User {\n            name\n            login\n            avatarUrl\n          }\n        }\n      }\n    }\n    isDraft\n    createdAt\n    url\n    baseRef {\n      branchProtectionRule {\n        requiredApprovingReviewCount\n      }\n    }\n    reviewDecision\n    totalCommentsCount\n    reviews(first: 100, states: APPROVED) {\n      totalCount\n      nodes {\n        author {\n          login\n          avatarUrl\n        }\n        state\n      }\n    }\n    comments(first: 100) {\n      nodes {\n        author {\n          login\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetGithubPullRequests {\n    search(\n      first: 100\n      query: "type:pr involves:@me is:open archived:false"\n      type: ISSUE\n    ) {\n      nodes {\n        ... on PullRequest {\n          ...GitHubPullRequest\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetGithubPullRequests {\n    search(\n      first: 100\n      query: "type:pr involves:@me is:open archived:false"\n      type: ISSUE\n    ) {\n      nodes {\n        ... on PullRequest {\n          ...GitHubPullRequest\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetViewer {\n    viewer {\n      id\n      avatarUrl\n      login\n      name\n    }\n  }\n",
): (typeof documents)["\n  query GetViewer {\n    viewer {\n      id\n      avatarUrl\n      login\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
