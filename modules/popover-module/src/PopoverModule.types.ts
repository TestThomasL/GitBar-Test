export type PopoverModuleType = {
  open: () => void;
  close: () => void;
  setAppearance: (isDark: boolean) => void;
  setStatusItemText: (text: string) => void;
};
