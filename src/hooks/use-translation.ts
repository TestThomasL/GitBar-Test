import { useIntl } from "react-intl";

import { FormatMessage, FormatNumber, FormatOptions } from "models/intl";

/** Wrapper hook for exposing translation functions of react-intl. */
export default function useTranslation(): {
  t: FormatMessage;
  n: FormatNumber;
} {
  const { formatMessage, formatNumber } = useIntl();

  return {
    /** Transforms a number to a readable format like: '13.37' -> '€13,37' */
    n: (value = 0, options?: FormatOptions) => formatNumber(value, options),
    /** Translates a translation key to a readable label */
    t: (id, options?: FormatOptions) =>
      // Add a default message to the translation to make sure unit tests do not get cluttered with console errors.
      formatMessage({ id, defaultMessage: id }, options),
  };
}
