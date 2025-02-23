import { useQueries } from "@tanstack/react-query";
import { useContext } from "react";

import { AccountsContext } from "contexts/accounts";
import useMacState from "hooks/use-mac-state";
import { MacState } from "modules/app-module";

const usePullRequestsQueries = () => {
  const accounts = useContext(AccountsContext);
  const macState = useMacState();

  return useQueries({
    queries: accounts.map((account) => ({
      queryKey: ["pull-requests", account.id],
      queryFn: async () => account.getPullRequests(),
      refetchInterval: 180000, // 3 minutes
      enabled: macState === MacState.UNLOCKED,
    })),
  });
};

export default usePullRequestsQueries;
