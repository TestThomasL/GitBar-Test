import { graphql } from "../codegen";

const QueryGetGitHubViewer = graphql(`
  query GetViewer {
    viewer {
      id
      avatarUrl
      login
      name
    }
  }
`);

export default QueryGetGitHubViewer;
