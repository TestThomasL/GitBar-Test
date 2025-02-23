import { graphql } from "../codegen";

const QueryGetGitLabCurrentUser = graphql(`
  query GetCurrentUser {
    currentUser {
      id
      avatarUrl
      username
      name
    }
  }
`);

export default QueryGetGitLabCurrentUser;
