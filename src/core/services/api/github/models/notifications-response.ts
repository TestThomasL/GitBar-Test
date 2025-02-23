export type NotificationsResponse = NotificationResponse[];

export type NotificationResponse = {
  id: string;
  unread: boolean;
  reason:
    | "subscribed"
    | "manual"
    | "author"
    | "comment"
    | "mention"
    | "team_mention"
    | "state_change"
    | "assign"
    | "review_requested"
    | "security_alert"
    | "invitation"
    | "resolved";
  updated_at: string;
  subject: {
    title: string;
    url: string;
    latest_comment_url: string;
    type: "Issue" | "PullRequest";
  };
};
