/* eslint-disable no-underscore-dangle */
import {
  GitHubPullRequestFragment,
  PullRequestReviewState,
} from "gql/github/codegen/graphql";
import { Attendee, Vote } from "models/attendee";

const getVote = (vote: PullRequestReviewState | undefined): Vote => {
  switch (vote) {
    case PullRequestReviewState.Approved:
      return Vote.Approved;
    case PullRequestReviewState.ChangesRequested:
      return Vote.WaitingFor;
    default:
      return Vote.NoVote;
  }
};

const transformGitHubAttendees = (
  requestedReviewers: GitHubPullRequestFragment["reviewRequests"],
  reviews: GitHubPullRequestFragment["reviews"],
): Attendee[] => {
  const reviewers =
    reviews?.nodes?.map<Attendee>((review) => ({
      name: review?.author?.login ?? "",
      avatarUrl: review?.author?.avatarUrl ?? "",
      vote: getVote(review?.state),
    })) ?? [];

  const requested =
    requestedReviewers?.nodes?.map<Attendee>((reviewer) => ({
      name:
        reviewer?.requestedReviewer?.__typename === "User"
          ? reviewer.requestedReviewer.login
          : "",
      avatarUrl:
        reviewer?.requestedReviewer?.__typename === "User"
          ? reviewer.requestedReviewer.avatarUrl
          : "",
      vote: Vote.NoVote,
    })) ?? [];

  const attendees = [...reviewers, ...requested]
    .filter(
      (attendee, index, self) =>
        index === self.findIndex((a) => a.name === attendee.name),
    )
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return attendees;
};

export default transformGitHubAttendees;
