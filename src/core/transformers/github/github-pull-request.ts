/* eslint-disable no-underscore-dangle */
import { getFragmentData } from "gql/github/codegen";
import {
  GetGithubPullRequestsQuery,
  PullRequestReviewState,
} from "gql/github/codegen/graphql";
import FragmentGitHubPullRequest from "gql/github/fragments/pull-request";
import Profile from "models/profile";
import { PullRequest } from "models/pull-request";
import getColorForProject from "utils/get-project-color";

import transformGitHubAttendees from "./github-combine-reviewers";

const transformGithubPullRequest = (
  profile: Profile,
  data?: GetGithubPullRequestsQuery,
): PullRequest[] => {
  if (!data) return [];

  return (
    data.search.nodes?.reduce<PullRequest[]>((acc, fragment) => {
      if (!fragment || fragment.__typename !== "PullRequest") return acc;

      const pr = getFragmentData(FragmentGitHubPullRequest, fragment);

      const attendees = transformGitHubAttendees(pr.reviewRequests, pr.reviews);

      const pullRequest: PullRequest = {
        id: pr.id,
        title: pr.title,
        author: {
          name: pr.author?.login ?? "",
          avatarUrl: pr.author?.avatarUrl ?? "",
        },
        repoId: pr.repository.id,
        repoName: pr.repository.nameWithOwner,
        reviewers: attendees,
        createdAt: pr.createdAt,
        url: pr.url,
        amountOfComments: pr.totalCommentsCount ?? 0,
        accentColor: getColorForProject(pr.repository.id),
        isDraft: pr.isDraft,
        isApprovedByMe:
          pr.reviews?.nodes?.some(
            (review) =>
              review?.author?.login === profile.userName &&
              review?.__typename === "PullRequestReview" &&
              review.state === PullRequestReviewState.Approved,
          ) ?? false,
        isCommentedByMe:
          pr.comments.nodes?.some(
            (comment) => comment?.author?.login === profile.userName,
          ) ?? false,
        isAssignedToMe:
          pr.reviewRequests?.nodes?.some(
            (assignee) =>
              assignee?.requestedReviewer?.__typename === "User" &&
              assignee.requestedReviewer.login === profile.userName,
          ) ?? false,
        isAuthoredByMe: pr.author?.login === profile.userName,
      };

      return [...acc, pullRequest];
    }, []) ?? []
  );
};

export default transformGithubPullRequest;
