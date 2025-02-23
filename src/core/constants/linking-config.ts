import { LinkingOptions } from "@react-navigation/native";

import { RootStackParamList } from "models/root-stack-param-list";

const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: ["gitbar://"],
  config: {
    screens: {
      RegisterGitHub: {
        path: "github",
        parse: {
          code: String,
        },
      },
    },
  },
};

export default linkingConfig;
