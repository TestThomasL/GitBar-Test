import { requireNativeModule } from "expo-modules-core";

import { PopoverModuleType } from "./PopoverModule.types";

export default requireNativeModule<PopoverModuleType>("PopoverModule");
