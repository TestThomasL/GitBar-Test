import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { OnboardingStackParamList } from "models/onboarding-stack-param-list";

import HowItWorks from "./how-it-works/how-it-works";
import Intro from "./intro/intro";
import LaunchAtLogin from "./launch-at-login/launch-at-login";
import Notifications from "./notifications/notifications";
import ReadyToGo from "./ready-to-go/ready-to-go";

const OnboardingStackNavigator =
  createStackNavigator<OnboardingStackParamList>();

const OnboardingStack: React.FC = () => (
  <OnboardingStackNavigator.Navigator
    initialRouteName="Intro"
    screenOptions={{
      headerShown: false,
    }}
  >
    <OnboardingStackNavigator.Screen name="Intro" component={Intro} />
    <OnboardingStackNavigator.Screen name="HowItWorks" component={HowItWorks} />
    <OnboardingStackNavigator.Screen
      name="LaunchAtLogin"
      component={LaunchAtLogin}
    />
    <OnboardingStackNavigator.Screen
      name="Notifications"
      component={Notifications}
    />
    <OnboardingStackNavigator.Screen name="ReadyToGo" component={ReadyToGo} />
  </OnboardingStackNavigator.Navigator>
);

export default OnboardingStack;
