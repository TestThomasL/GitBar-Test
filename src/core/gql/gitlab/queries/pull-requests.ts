import { graphql } from "../codegen";

const QueryGetGitLabPullRequests = graphql(`
  query GetGitLabPullRequests {
    currentUser {
      contributedProjects {
        nodes {
          archived
          mergeRequests(state: opened) {
            ...GitLabPullRequest
          }
        }
      }
    }
  }
`);

export default QueryGetGitLabPullRequests;
