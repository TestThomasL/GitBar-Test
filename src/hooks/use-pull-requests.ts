import { useContext, useMemo } from "react";

import { DataContext } from "contexts/data";
import { selectHiddenPullRequests } from "store/selectors/pull-requests";
import {
  selectGroupPRsBy,
  selectHideDraftPRs,
  selectHidePRsAfterTwoMonths,
  selectHidePRsApprovedByMe,
} from "store/selectors/settings";
import groupPullRequestsBy from "utils/group-pull-requests";
import {
  filterPRQueryResult,
  filterRelevantPRs,
} from "utils/pull-request-filters";

import useSelector from "./use-selector";

const usePullRequests = () => {
  const groupPRsBy = useSelector(selectGroupPRsBy);
  const hidePRsAfterTwoMonths = useSelector(selectHidePRsAfterTwoMonths);
  const hidePRsApprovedByMe = useSelector(selectHidePRsApprovedByMe);
  const hiddenPullRequests = useSelector(selectHiddenPullRequests);
  const hideDraftPRs = useSelector(selectHideDraftPRs);

  const { pullRequests: result } = useContext(DataContext);

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

  const { groupedAllPrs, groupedRelevantPRs } = useMemo(() => {
    const prs = filterPRQueryResult(result);
    const relevantPrs = filterRelevantPRs(
      prs,
      hiddenPullRequests,
      hidePRsAfterTwoMonths,
      hidePRsApprovedByMe,
      hideDraftPRs,
    );

    const prsGrouped = groupPullRequestsBy(prs, groupPRsBy);
    const relevantPrsGrouped = groupPullRequestsBy(relevantPrs, groupPRsBy);

    return {
      groupedAllPrs: prsGrouped,
      groupedRelevantPRs: relevantPrsGrouped,
    };
  }, [
    result,
    hiddenPullRequests,
    hideDraftPRs,
    hidePRsAfterTwoMonths,
    hidePRsApprovedByMe,
    groupPRsBy,
  ]);

  return {
    groupedAllPrs,
    groupedRelevantPRs,
    ...queryInfo,
  };
};

export default usePullRequests;
