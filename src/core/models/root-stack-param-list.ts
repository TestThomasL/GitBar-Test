export type RootStackParamList = {
  Dashboard: undefined;
  AddAccount?: {
    showBackButton: boolean;
  };
  Notifications: undefined;
  RegisterGitHub: {
    code: string;
  };
  RegisterGitLab: undefined;
  RegisterAzure: undefined;
  Settings: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
