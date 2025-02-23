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
  "\n  fragment GitLabPullRequest on MergeRequestConnection {\n    nodes {\n      title\n      id\n      approvalsRequired\n      approvalsLeft\n      webUrl\n      draft\n      author {\n        name\n        username\n        avatarUrl\n      }\n      reviewers {\n        nodes {\n          name\n          username\n          avatarUrl\n          mergeRequestInteraction {\n            approved\n            reviewState\n          }\n        }\n      }\n      commenters {\n        nodes {\n          username\n        }\n      }\n      sourceProject {\n        name\n        id\n      }\n      userNotesCount\n      createdAt\n    }\n  }\n":
    types.GitLabPullRequestFragmentDoc,
  "\n  query GetCurrentUser {\n    currentUser {\n      id\n      avatarUrl\n      username\n      name\n    }\n  }\n":
    types.GetCurrentUserDocument,
  "\n  query GetGitLabPullRequests {\n    currentUser {\n      contributedProjects {\n        nodes {\n          archived\n          mergeRequests(state: opened) {\n            ...GitLabPullRequest\n          }\n        }\n      }\n    }\n  }\n":
    types.GetGitLabPullRequestsDocument,
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
  source: "\n  fragment GitLabPullRequest on MergeRequestConnection {\n    nodes {\n      title\n      id\n      approvalsRequired\n      approvalsLeft\n      webUrl\n      draft\n      author {\n        name\n        username\n        avatarUrl\n      }\n      reviewers {\n        nodes {\n          name\n          username\n          avatarUrl\n          mergeRequestInteraction {\n            approved\n            reviewState\n          }\n        }\n      }\n      commenters {\n        nodes {\n          username\n        }\n      }\n      sourceProject {\n        name\n        id\n      }\n      userNotesCount\n      createdAt\n    }\n  }\n",
): (typeof documents)["\n  fragment GitLabPullRequest on MergeRequestConnection {\n    nodes {\n      title\n      id\n      approvalsRequired\n      approvalsLeft\n      webUrl\n      draft\n      author {\n        name\n        username\n        avatarUrl\n      }\n      reviewers {\n        nodes {\n          name\n          username\n          avatarUrl\n          mergeRequestInteraction {\n            approved\n            reviewState\n          }\n        }\n      }\n      commenters {\n        nodes {\n          username\n        }\n      }\n      sourceProject {\n        name\n        id\n      }\n      userNotesCount\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetCurrentUser {\n    currentUser {\n      id\n      avatarUrl\n      username\n      name\n    }\n  }\n",
): (typeof documents)["\n  query GetCurrentUser {\n    currentUser {\n      id\n      avatarUrl\n      username\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetGitLabPullRequests {\n    currentUser {\n      contributedProjects {\n        nodes {\n          archived\n          mergeRequests(state: opened) {\n            ...GitLabPullRequest\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetGitLabPullRequests {\n    currentUser {\n      contributedProjects {\n        nodes {\n          archived\n          mergeRequests(state: opened) {\n            ...GitLabPullRequest\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
