import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import BlobBackground from "components/blob-background/blob-background";
import IntlProvider from "contexts/intl";
import ReduxProvider from "contexts/redux-provider";
import ThemeProvider from "contexts/theme";

import OnboardingStack from "./pages/routes";

const Onboarding: React.FC = () => (
  <ReduxProvider>
    <ThemeProvider>
      <BlobBackground>
        <IntlProvider>
          <NavigationContainer
            theme={{
              // Override the default theme
              dark: false,
              colors: {
                notification: "transparent",
                background: "transparent",
                border: "transparent",
                card: "transparent",
                primary: "transparent",
                text: "transparent",
              },
            }}
          >
            <OnboardingStack />
          </NavigationContainer>
        </IntlProvider>
      </BlobBackground>
    </ThemeProvider>
  </ReduxProvider>
);

export default Onboarding;
