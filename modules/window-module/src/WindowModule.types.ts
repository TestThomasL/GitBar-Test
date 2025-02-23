export type WindowModuleType = {
  openWindow: (
    moduleName: string,
    options: NativeWindowOptions,
  ) => Promise<void>;
  closeWindow: (moduleName: string) => Promise<void>;
  // STYLE_MASK_CONSTANTS
  STYLE_MASK_BORDERLESS: number;
  STYLE_MASK_TITLED: number;
  STYLE_MASK_CLOSABLE: number;
  STYLE_MASK_MINIATURIZABLE: number;
  STYLE_MASK_RESIZABLE: number;
  STYLE_MASK_UNIFIED_TITLE_AND_TOOLBAR: number;
  STYLE_MASK_FULL_SCREEN: number;
  STYLE_MASK_FULL_SIZE_CONTENT_VIEW: number;
  STYLE_MASK_UTILITY_WINDOW: number;
  STYLE_MASK_DOC_MODAL_WINDOW: number;
  STYLE_MASK_NONACTIVATING_PANEL: number;
};

export enum WindowStyleMask {
  Borderless,
  Titled,
  Closable,
  Miniaturizable,
  Resizable,
  UnifiedTitleAndToolbar,
  FullScreen,
  FullSizeContentView,
  UtilityWindow,
  DocModalWindow,
  NonactivatingPanel,
}

export type WindowOptions = {
  title?: string;
  windowStyle?: {
    mask?: WindowStyleMask[];
    height?: number;
    width?: number;
    titlebarAppearsTransparent?: boolean;
  };
};

export type WindowsConfig = {
  [key: string]: {
    component: React.ComponentType<any>;
    options?: WindowOptions;
  };
};

export type NativeWindowOptions = Omit<WindowOptions, "windowStyle"> & {
  windowStyle?: Omit<WindowOptions["windowStyle"], "mask"> & {
    mask?: number;
  };
};
