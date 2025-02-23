import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native-macos";

import IssueCard from "components/issue-card/issue-card";
import PageHeader from "components/page-header/page-header";
import useNotifications from "hooks/use-notifications";
import useTranslation from "hooks/use-translation";
import DefaultLayout from "layouts/default-layout/default-layout";

import useStyles from "./notifications.styles";

const Notifications: React.FC = () => {
  const $ = useStyles();
  const { t } = useTranslation();
  const { notifications, updatedAt, isLoading } = useNotifications();

  return (
    <DefaultLayout>
      <View style={$.container}>
        <PageHeader
          title={t("Notifications/Heading/Title")}
          updatedAt={updatedAt}
          buttonToggleOptions={[
            { label: t("Notifications/Heading/Issues"), onPress: () => {} },
          ]}
        />
        {isLoading && <ActivityIndicator />}
        <FlatList
          data={notifications}
          contentContainerStyle={$.list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <IssueCard
              title={item.title}
              updatedAt={item.updatedAt}
              projectPath={item.projectPath}
              url={item.url}
            />
          )}
        />
      </View>
    </DefaultLayout>
  );
};

export default Notifications;
