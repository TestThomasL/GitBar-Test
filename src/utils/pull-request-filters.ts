import { UseQueryResult } from "@tanstack/react-query";

import { PullRequest } from "models/pull-request";
import { HiddenPullRequest } from "store/slices/pull-requests";

export const filterPRQueryResult = (
  result: UseQueryResult<PullRequest[], Error>[],
): PullRequest[] =>
  result
    .map((d) => d.data)
    .flat()
    .filter((d) => d !== undefined)
    .filter(
      (pr) => pr.isAuthoredByMe || pr.isAssignedToMe || pr.isCommentedByMe,
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

export const filterRelevantPRs = (
  pullRequests: PullRequest[],
  hiddenPullRequests: HiddenPullRequest[],
  hidePRsAfterTwoMonths: boolean,
  hidePRsApprovedByMe: boolean,
  hideDraftPRs: boolean,
): PullRequest[] => {
  const relevantPrs = pullRequests
    .filter(
      (pr) =>
        !hiddenPullRequests.some(
          (hiddenPr) =>
            hiddenPr.id === pr.id && hiddenPr.repoName === pr.repoName,
        ),
    )
    .filter((pr) => {
      if (hidePRsAfterTwoMonths) {
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        return new Date(pr.createdAt) > twoMonthsAgo;
      }
      return true;
    })
    .filter((pr) => !hidePRsApprovedByMe || !pr.isApprovedByMe)
    .filter((pr) => !pr.isDraft || !hideDraftPRs);

  return relevantPrs;
};
