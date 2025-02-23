import { getFragmentData } from "gql/github/codegen";
import {
  GetGitLabPullRequestsQuery,
  MergeRequestReviewState,
} from "gql/gitlab/codegen/graphql";
import FragmentGitLabPullRequest from "gql/gitlab/fragments/pull-request";
import { Attendee, Vote } from "models/attendee";
import Profile from "models/profile";
import { PullRequest } from "models/pull-request";
import getColorForProject from "utils/get-project-color";

const getVote = (vote: MergeRequestReviewState | undefined | null): Vote => {
  switch (vote) {
    case MergeRequestReviewState.Approved:
      return Vote.Approved;
    case MergeRequestReviewState.RequestedChanges:
      return Vote.WaitingFor;
    default:
      return Vote.NoVote;
  }
};

const transformGitLabPullRequest = ({
  domain,
  data,
  profile,
}: {
  domain: string;
  data: GetGitLabPullRequestsQuery;
  profile: Profile;
}): PullRequest[] => {
  const pullRequests = (data.currentUser?.contributedProjects?.nodes ?? [])
    .filter((project) => !project?.archived)
    .flatMap((project) => project?.mergeRequests ?? [])
    .flatMap((fragment) =>
      getFragmentData(FragmentGitLabPullRequest, [fragment]),
    )
    .flatMap((fragment) => fragment.nodes ?? []);

  return pullRequests.reduce<PullRequest[]>((acc, pr) => {
    if (!pr) return acc;

    const pullRequest: PullRequest = {
      id: pr.id,
      title: pr.title,
      author: {
        name: pr.author?.name ?? "",
        avatarUrl: pr.author?.avatarUrl?.includes("https")
          ? pr.author.avatarUrl
          : `${domain}${pr.author?.avatarUrl}`,
      },
      repoId: pr.sourceProject?.id ?? "",
      repoName: pr.sourceProject?.name ?? "",
      reviewers: (
        pr.reviewers?.nodes?.map<Attendee>((reviewer) => ({
          name: reviewer?.name ?? "",
          avatarUrl: reviewer?.avatarUrl?.includes("http")
            ? reviewer.avatarUrl
            : `${domain}${reviewer?.avatarUrl}`,
          vote: getVote(reviewer?.mergeRequestInteraction?.reviewState),
        })) ?? []
      ).sort((a, b) => (a.name > b.name ? 1 : -1)),
      createdAt: pr.createdAt,
      url: pr.webUrl ?? "",
      amountOfComments: pr.userNotesCount ?? 0,
      accentColor: getColorForProject(pr.sourceProject?.name ?? ""),
      isDraft: pr.draft,
      isApprovedByMe:
        pr.reviewers?.nodes?.some(
          (reviewer) =>
            reviewer?.name === profile.name &&
            !!reviewer.mergeRequestInteraction?.approved,
        ) ?? false,
      isCommentedByMe:
        pr.commenters.nodes?.some(
          (commenter) => commenter?.username === profile.userName,
        ) ?? false,
      isAssignedToMe:
        pr.reviewers?.nodes?.some(
          (reviewer) => reviewer?.username === profile.userName,
        ) ?? false,
      isAuthoredByMe: pr.author?.username === profile.userName,
    };

    return [...acc, pullRequest];
  }, []);
};

export default transformGitLabPullRequest;
