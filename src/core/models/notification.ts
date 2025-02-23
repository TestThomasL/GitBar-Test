export enum NotificationType {
  ISSUE = "Issue",
  PULL_REQUEST = "PullRequest",
}

type Notification = {
  id: string;
  unread: boolean;
  updatedAt: string;
  title: string;
  url: string;
  projectPath: string;
  type: NotificationType;
};

export default Notification;
