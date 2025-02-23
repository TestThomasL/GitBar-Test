import { graphql } from "../codegen";

const QueryGetGithubPullRequests = graphql(`
  query GetGithubPullRequests {
    search(
      first: 100
      query: "type:pr involves:@me is:open archived:false"
      type: ISSUE
    ) {
      nodes {
        ... on PullRequest {
          ...GitHubPullRequest
        }
      }
    }
  }
`);

export default QueryGetGithubPullRequests;
