import { GroupPullRequestsBy, PullRequest } from "models/pull-request";

export type PullRequestSection = {
  title: string;
  data: PullRequest[];
  hideTitle?: boolean;
};

const groupPullRequestsBy = (
  pullRequests: PullRequest[],
  groupPRsBy: GroupPullRequestsBy,
) =>
  pullRequests.reduce<PullRequestSection[]>((acc, pullRequest) => {
    let section: PullRequestSection | undefined;
    let title: string = "";
    if (groupPRsBy === GroupPullRequestsBy.REPO) {
      section = acc.find((s) => s.title === pullRequest.repoName);
      if (!section) {
        title = pullRequest.repoName;
      }
    }

    if (groupPRsBy === GroupPullRequestsBy.DATE) {
      section = acc.find(
        (s) =>
          new Date(s.title).toDateString() ===
          new Date(pullRequest.createdAt).toDateString(),
      );
      if (!section) {
        title = new Date(pullRequest.createdAt).toDateString();
      }
    }

    if (groupPRsBy === GroupPullRequestsBy.NONE) {
      section = acc.find((s) => s.title === "");
    }

    if (!section) {
      section = {
        title,
        data: [pullRequest],
        hideTitle: groupPRsBy === GroupPullRequestsBy.NONE,
      };
      acc.push(section);
    } else {
      section.data.push(pullRequest);
    }

    return acc;
  }, []);

export default groupPullRequestsBy;
