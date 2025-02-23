import Notification, { NotificationType } from "models/notification";
import { NotificationResponse } from "services/api/github/models/notifications-response";
import extractParams from "utils/extract-params";

const transformGitHubNotification = (
  notification: NotificationResponse,
): Notification => {
  const path = extractParams(
    notification.subject.url,
    "/repos/:owner/:repo/:type/:id",
  );

  return {
    id: notification.id,
    title: notification.subject.title,
    type: notification.subject.type as NotificationType,
    url: notification.subject.url,
    updatedAt: notification.updated_at,
    unread: notification.unread,
    projectPath: `/${path?.owner}/${path?.repo}/${path?.id}`,
  };
};

export default transformGitHubNotification;
