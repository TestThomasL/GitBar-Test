import { useQueries } from "@tanstack/react-query";
import { useContext, useMemo } from "react";

import { AccountsContext } from "contexts/accounts";

const useProfiles = () => {
  const accounts = useContext(AccountsContext);

  const result = useQueries({
    queries: accounts.map((account) => ({
      queryKey: ["profiles", account.id],
      queryFn: async () => account.getValidatedProfile(),
    })),
  });

  const isLoading = useMemo(() => result.some((r) => r.isLoading), [result]);

  return {
    profiles: result.filter((r) => !!r.data).map((r) => r.data),
    isLoading,
  };
};

export default useProfiles;
