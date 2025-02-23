import { UseQueryResult } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useMemo, useRef } from "react";

import useDataHelper from "hooks/context/use-data-context-helpers";
import useNotificationsQueries from "hooks/queries/use-notifications-queries";
import usePullRequestsQueries from "hooks/queries/use-pull-requests-queries";
import usePopoverState, { PopoverState } from "hooks/use-popover-state";
import Notification from "models/notification";
import { PullRequest } from "models/pull-request";

type Data = {
  pullRequests: UseQueryResult<PullRequest[], Error>[];
  notifications: UseQueryResult<Notification[], Error>[];
};

const defaultData = {
  pullRequests: [],
  notifications: [],
};

export const DataContext = createContext<Data>(defaultData);

const DataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { updateMenuBarAndSendNotification } = useDataHelper();
  const oldData = useRef<Data>(defaultData);
  const pullRequests = usePullRequestsQueries();
  const notifications = useNotificationsQueries();
  const popoverState = usePopoverState();

  const data = useMemo(() => {
    const returnData = {
      pullRequests,
      notifications,
    };

    updateMenuBarAndSendNotification(pullRequests);

    if (popoverState === PopoverState.CLOSED) {
      return oldData.current;
    }

    oldData.current = returnData;
    return returnData;
  }, [
    pullRequests,
    notifications,
    updateMenuBarAndSendNotification,
    popoverState,
  ]);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
