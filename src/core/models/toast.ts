import iconImportMap from "components/icon/icon-imports";

import { ThemeColor } from "./theme";

export type ToastType = "neutral" | "error";

export type Toast = {
  id: string;
  type?: ToastType;
  closeButton?: boolean;
  duration?: number;
  // NOTE: Don't use IconName prop here, it creates a dependency cycle
  icon?: keyof typeof iconImportMap;
  iconColor?: ThemeColor;
  message: string;
};
