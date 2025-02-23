import React, { createContext, PropsWithChildren, useMemo } from "react";
import { IntlProvider as Provider } from "react-intl";

import en_GB from "assets/locales/en.json";
import Locales from "constants/intl";

// Use the type of the keys from the en_GB object
export type TranslationKey = keyof typeof en_GB;

interface LanguageContext {
  locale: string;
}

export const Language = createContext<undefined | LanguageContext>(undefined);

const IntlProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const api = useMemo(() => ({ locale: Locales.en }), []);

  return (
    <Language.Provider value={api}>
      <Provider locale={api.locale} messages={en_GB}>
        {children}
      </Provider>
    </Language.Provider>
  );
};

export default IntlProvider;
