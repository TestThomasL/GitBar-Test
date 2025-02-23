import { SvgProps } from "react-native-svg";

import Azure from "assets/illustrations/azure-devops.svg";
import GitLab from "assets/illustrations/gitlab.svg";
import GitHub from "assets/svgs/github.svg";
import { AccountType } from "models/account";

const AccountMap: Record<AccountType, React.FC<SvgProps>> = {
  [AccountType.Azure]: Azure,
  [AccountType.GitHub]: GitHub,
  [AccountType.GitLab]: GitLab,
};

export default AccountMap;
