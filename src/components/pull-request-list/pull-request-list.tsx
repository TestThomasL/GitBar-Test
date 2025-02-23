import { memo, useCallback, useMemo } from "react";
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
} from "react-native";

import Body from "components/body/body";
import ErrorContainer from "components/error-container/error-container";
import PullRequestCard from "components/pull-request-card/pull-request-card";
import useDispatch from "hooks/use-dispatch";
import useTranslation from "hooks/use-translation";
import { PullRequest } from "models/pull-request";
import { setPullRequestHidden } from "store/slices/pull-requests";
import { PullRequestSection } from "utils/group-pull-requests";

import useStyles from "./pull-request-list.styles";

const SectionHeader = ({
  section: { title, hideTitle },
}: {
  section: SectionListData<PullRequest, PullRequestSection>;
}) => {
  if (hideTitle) {
    return null;
  }

  return (
    <Body bold size="xs">
      {title}
    </Body>
  );
};

type Props = {
  errors: Error[];
  sections: PullRequestSection[];
};

const PullRequestList: React.FC<Props> = ({ errors, sections }) => {
  const $ = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const actionSheetOptions = useMemo(
    () => ({
      options: [t("PullRequestCard/ActionSheet/Hide")],
    }),
    [t],
  );

  const actionSheetCallback = useCallback(
    (buttonIndex: number, id: string, repoName: string) => {
      if (buttonIndex === 0) {
        dispatch(setPullRequestHidden({ id, repoName }));
      }
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({ item }: SectionListRenderItemInfo<PullRequest, PullRequestSection>) => (
      <PullRequestCard
        key={item.id}
        id={item.id}
        repoName={item.repoName}
        title={item.title}
        author={item.author}
        reviewers={item.reviewers}
        url={item.url}
        amountOfComments={item.amountOfComments}
        accentColor={item.accentColor}
        actionSheetOptions={actionSheetOptions}
        actionSheetCallback={actionSheetCallback}
        isDraft={item.isDraft}
      />
    ),
    [actionSheetCallback, actionSheetOptions],
  );

  return (
    <SectionList
      contentContainerStyle={$.list}
      initialNumToRender={15}
      maxToRenderPerBatch={5}
      sections={sections}
      ListHeaderComponent={
        errors.length > 0 ? <ErrorContainer errors={errors} /> : undefined
      }
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      renderSectionHeader={SectionHeader}
    />
  );
};

export default memo(PullRequestList);
