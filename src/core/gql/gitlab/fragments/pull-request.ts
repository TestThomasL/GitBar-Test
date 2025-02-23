import { graphql } from "../codegen";

const FragmentGitLabPullRequest = graphql(`
  fragment GitLabPullRequest on MergeRequestConnection {
    nodes {
      title
      id
      approvalsRequired
      approvalsLeft
      webUrl
      draft
      author {
        name
        username
        avatarUrl
      }
      reviewers {
        nodes {
          name
          username
          avatarUrl
          mergeRequestInteraction {
            approved
            reviewState
          }
        }
      }
      commenters {
        nodes {
          username
        }
      }
      sourceProject {
        name
        id
      }
      userNotesCount
      createdAt
    }
  }
`);

export default FragmentGitLabPullRequest;
