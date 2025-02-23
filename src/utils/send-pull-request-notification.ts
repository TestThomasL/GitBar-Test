import { PullRequest } from "models/pull-request";
import NotificationsModule from "modules/notifications-module";

const sendPullRequestNotification = (
  pullRequests: PullRequest[],
  prevPullRequests?: PullRequest[],
) => {
  if (prevPullRequests) {
    const newPullRequests = pullRequests
      .filter((pr) => !prevPullRequests.some((prevPr) => prevPr.id === pr.id))
      .filter((pr) => !pr.isAuthoredByMe);

    const newComments = pullRequests.reduce((acc, pr) => {
      const prevPR = prevPullRequests.find((prevPr) => prevPr.id === pr.id);

      if (!prevPR) {
        return acc;
      }

      const commentDiff =
        (pr.amountOfComments ?? 0) - (prevPR.amountOfComments ?? 0);

      if (commentDiff > 0) {
        return acc + commentDiff;
      }

      return acc;
    }, 0);

    if (newPullRequests.length > 0 || newComments > 0) {
      NotificationsModule.sendNotification(
        "GitBar update:",
        `You have ${newPullRequests.length} new pull requests and ${newComments} new comments`,
      );
    }
  }
};

export default sendPullRequestNotification;
