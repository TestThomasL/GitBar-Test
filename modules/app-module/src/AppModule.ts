import { NativeModule, requireNativeModule } from "expo";

import { AppModuleEvents } from "./AppModule.types";

declare class AppModule extends NativeModule<AppModuleEvents> {
  closeApp(): void;
}

export default requireNativeModule<AppModule>("AppModule");
