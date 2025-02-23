import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Linking } from "react-native-macos";

import Body from "components/body/body";
import Heading from "components/heading/heading";
import Icon from "components/icon/icon";
import Spacer from "components/spacer/spacer";
import useTranslation from "hooks/use-translation";
import calculateMinutesAgo from "utils/calculate-minutes-ago";

import useStyles from "./issue-card.styles";

type Props = {
  title: string;
  projectPath: string;
  updatedAt: string;
  url: string;
};

const IssueCard: React.FC<Props> = ({ title, projectPath, updatedAt, url }) => {
  const $ = useStyles();
  const { t } = useTranslation();

  const timeAgo = useMemo(() => {
    const date = new Date(updatedAt);
    const minutesAgo = calculateMinutesAgo(date.getTime());

    if (minutesAgo < 60) {
      return t("General/Time/Minutes", { count: minutesAgo });
    }

    const hoursAgo = Math.floor(minutesAgo / 60);

    if (hoursAgo < 24) {
      return t("General/Time/Hours", { count: hoursAgo });
    }

    return t("General/Time/Days", { count: Math.floor(hoursAgo / 24) });
  }, [updatedAt, t]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={$.card}
      onPress={async () => {
        await Linking.openURL(url);
      }}
    >
      <View style={$.header}>
        <Icon name="IssueCircle" size={20} color="icon" />
        <Spacer mb={0.5}>
          <Heading size="x2s">{title}</Heading>
        </Spacer>
      </View>
      <View style={$.footer}>
        <Body size="xs">{projectPath}</Body>
        <View style={$.right}>
          <Body size="xs">
            {t("General/Time/Updated", {
              timeAgo,
            })}
          </Body>
          <Icon name="Clock" size={14} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default IssueCard;
