import { requireNativeModule } from "expo-modules-core";

import { WindowModuleType } from "./WindowModule.types";

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
export default requireNativeModule<WindowModuleType>("WindowModule");
