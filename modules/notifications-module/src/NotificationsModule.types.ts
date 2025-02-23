export enum NotificationPermission {
  NOT_DETERMINED = 0,
  DENIED = 1,
  AUTHORIZED = 2,
  PROVISIONAL = 3,
}

export type NotificationsModuleType = {
  requestPermissions: () => Promise<void>;
  getPermissions: () => Promise<NotificationPermission>;
  sendNotification: (title: string, body: string) => void;
};
