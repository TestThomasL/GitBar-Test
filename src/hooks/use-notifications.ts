import { useContext, useMemo } from "react";

import { DataContext } from "contexts/data";
import { NotificationType } from "models/notification";

const useNotifications = () => {
  const { notifications: result } = useContext(DataContext);

  const queryInfo = useMemo(
    () => ({
      updatedAt:
        result.length > 0 && result[result.length - 1].dataUpdatedAt > 0
          ? result[result.length - 1].dataUpdatedAt
          : Date.now(),
      isLoading: result.some((d) => d.isLoading),
      errors: result.filter((d) => !!d.error).map((d) => d.error),
    }),
    [result],
  );

  const notifications = useMemo(
    () =>
      result
        .map((d) => d.data)
        .flat()
        .filter((d) => d !== undefined)
        .filter((d) => d.type === NotificationType.ISSUE)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        ),
    [result],
  );

  return { ...queryInfo, notifications };
};

export default useNotifications;
