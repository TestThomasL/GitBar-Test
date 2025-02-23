import { graphql } from "../codegen";

const FragmentGitHubPullRequest = graphql(`
  fragment GitHubPullRequest on PullRequest {
    id
    title
    author {
      avatarUrl
      login
    }
    repository {
      nameWithOwner
      id
    }
    reviewRequests(first: 5) {
      nodes {
        requestedReviewer {
          ... on User {
            name
            login
            avatarUrl
          }
        }
      }
    }
    isDraft
    createdAt
    url
    baseRef {
      branchProtectionRule {
        requiredApprovingReviewCount
      }
    }
    reviewDecision
    totalCommentsCount
    reviews(first: 100, states: APPROVED) {
      totalCount
      nodes {
        author {
          login
          avatarUrl
        }
        state
      }
    }
    comments(first: 100) {
      nodes {
        author {
          login
        }
      }
    }
  }
`);

export default FragmentGitHubPullRequest;
