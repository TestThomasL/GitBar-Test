import { PropsWithChildren, createContext, useMemo } from "react";

import useSelector from "hooks/use-selector";
import { AccountType } from "models/account";
import AzureProvider from "src/core/data-providers/azure-provider";
import GitHubProvider from "src/core/data-providers/github-provider";
import GitLabProvider from "src/core/data-providers/gitlab-provider";
import Provider from "src/core/data-providers/provider";
import { selectAccounts } from "store/selectors/accounts";

export const AccountsContext = createContext<Provider[]>([]);

const AccountsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const accounts = useSelector(selectAccounts);

  const providers = useMemo(
    (): Provider[] =>
      accounts.map((account) => {
        switch (account.type) {
          case AccountType.Azure:
            return new AzureProvider(account.id, account.auth);
          case AccountType.GitHub:
            return new GitHubProvider(account.id, account.auth);
          case AccountType.GitLab:
            return new GitLabProvider(account.id, account.auth);
          default:
            throw new Error(`Unknown account: ${account}`);
        }
      }),
    [accounts],
  );

  return (
    <AccountsContext.Provider value={providers}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
