// THIS IS INTEGRATED IN THE MACOS FOLDER

import { NativeModules } from "react-native";

type LaunchAtLoginModuleType = {
  checkStatus: () => Promise<boolean>;
  setStatus: (enabled: boolean) => Promise<void>;
};

// THIS IS A NATIVE MODULE IN THE macOS FOLDER
const launchAtLoginModule =
  NativeModules.LaunchAtLoginModule as LaunchAtLoginModuleType;

const LaunchAtLoginModule = {
  setStatus: launchAtLoginModule.setStatus,
  getStatus: launchAtLoginModule.checkStatus,
} as const;

export default LaunchAtLoginModule;
