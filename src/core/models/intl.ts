import { TranslationKey } from "contexts/intl";

/** Options for formatting a string or number */
export type FormatOptions = Record<
  string | number,
  string | number | undefined
>;

/** Format message function, for translating labels */
export type FormatMessage = (
  id: TranslationKey,
  options?: FormatOptions,
) => string;
/** Format number function, for formatting numbers like prices and dates */
export type FormatNumber = (value: number, options?: FormatOptions) => string;
