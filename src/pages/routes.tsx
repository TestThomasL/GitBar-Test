import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";

import useSelector from "hooks/use-selector";
import { RootStackParamList } from "models/root-stack-param-list";
import PopoverModule from "modules/popover-module";
import AddAccount from "pages/add-account/add-account";
import RegisterAzure from "pages/auth/register/azure";
import RegisterGithub from "pages/auth/register/github";
import RegisterGitLab from "pages/auth/register/gitlab";
import Dashboard from "pages/dashboard/dashboard";
import Notifications from "pages/notifications/notifications";
import Settings from "pages/settings/settings";
import WindowNavigator from "src/windows";
import { selectAccounts } from "store/selectors/accounts";
import { selectIsOnboarded } from "store/selectors/user";

const RootStackNavigator = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  const accounts = useSelector(selectAccounts);
  const isOnboarded = useSelector(selectIsOnboarded);

  useEffect(() => {
    if (!isOnboarded) {
      void WindowNavigator.open("Onboarding");
      return;
    }

    PopoverModule.open();
  }, [isOnboarded]);

  return (
    <RootStackNavigator.Navigator
      initialRouteName={accounts.length > 0 ? "Dashboard" : "AddAccount"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStackNavigator.Screen name="Dashboard" component={Dashboard} />
      <RootStackNavigator.Screen
        name="Notifications"
        component={Notifications}
      />
      <RootStackNavigator.Screen
        name="RegisterAzure"
        component={RegisterAzure}
      />
      <RootStackNavigator.Screen
        name="RegisterGitLab"
        component={RegisterGitLab}
      />
      <RootStackNavigator.Screen
        name="RegisterGitHub"
        component={RegisterGithub}
      />
      <RootStackNavigator.Screen name="AddAccount" component={AddAccount} />
      <RootStackNavigator.Screen name="Settings" component={Settings} />
    </RootStackNavigator.Navigator>
  );
};

export default RootStack;
