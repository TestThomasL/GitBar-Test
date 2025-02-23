import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import BlobBackground from "components/blob-background/blob-background";
import Toasts from "components/toasts/toasts";
import linkingConfig from "constants/linking-config";
import AccountsProvider from "contexts/accounts";
import DataProvider from "contexts/data";
import IntlProvider from "contexts/intl";
import ReduxProvider from "contexts/redux-provider";
import ThemeProvider from "contexts/theme";
import ToastProvider from "contexts/toasts";
import RootStack from "pages/routes";

Sentry.init({
  dsn: "https://e4459bd169456448afd4a22a2ec5345a@o4507833408552960.ingest.de.sentry.io/4507833413009488",
  enabled: !__DEV__,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ReduxProvider>
      <AccountsProvider>
        <ThemeProvider>
          <IntlProvider>
            <BlobBackground>
              <DataProvider>
                <ToastProvider>
                  <NavigationContainer
                    linking={linkingConfig}
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
                    <RootStack />
                  </NavigationContainer>
                  <Toasts />
                </ToastProvider>
              </DataProvider>
            </BlobBackground>
          </IntlProvider>
        </ThemeProvider>
      </AccountsProvider>
    </ReduxProvider>
  </QueryClientProvider>
);

export default App;
