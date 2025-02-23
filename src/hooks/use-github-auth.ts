import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import DOMAINS from "constants/domains";
import URI_PATHS from "constants/uri-paths";
import PopoverModule from "modules/popover-module";
import SafariWebAuthModule from "modules/safari-web-auth-module";
import { AuthSessionTypeEnum } from "modules/safari-web-auth-module/src/SafariWebAuthModule.types";

import useTranslation from "./use-translation";

const useGitHubAuth = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const [error, setError] = useState<string>();

  const openAuthSession = async () => {
    const { type, url } = await SafariWebAuthModule.openAuthSessionAsync(
      `${DOMAINS.github}${URI_PATHS.githubOauthAuthorize}`,
      "gitbar://github",
      { preferEphemeralSession: false },
    );

    PopoverModule.open();

    if (type === AuthSessionTypeEnum.CANCEL) {
      setError(t("Auth/GitHub/Cancelled"));
      return;
    }

    if (type === AuthSessionTypeEnum.DISMISS) {
      setError(t("Auth/GitHub/Dismissed"));
      return;
    }

    setError(undefined);
    const newCode = url.split("code=")[1];
    navigate("RegisterGitHub", { code: newCode });
  };

  return { error, openAuthSession };
};

export default useGitHubAuth;
