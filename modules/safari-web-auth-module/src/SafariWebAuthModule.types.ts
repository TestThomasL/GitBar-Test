export enum AuthSessionTypeEnum {
  DISMISS = "dismiss",
  SUCCESS = "success",
  CANCEL = "cancel",
}

export type SafariWebAuthModuleType = {
  openAuthSessionAsync: (
    url: string,
    redirectUrl: string,
    options: {
      preferEphemeralSession: boolean;
    },
  ) => Promise<{
    type: AuthSessionTypeEnum;
    url: string;
    error: "string" | null;
  }>;
  dismissAuthSession: () => Promise<void>;
};
