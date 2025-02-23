import { EventSubscription } from "expo-modules-core";

import AppModule from "./src/AppModule";
import { MacStateChangeEvent } from "./src/AppModule.types";

export function addMacStateListener(
  listener: (event: MacStateChangeEvent) => void,
): EventSubscription {
  return AppModule.addListener("onMacStateChange", listener);
}

export { MacState } from "./src/AppModule.types";
export default AppModule;
