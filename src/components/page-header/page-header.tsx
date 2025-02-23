import React, { useEffect, useState } from "react";
import { View } from "react-native";

import Body from "components/body/body";
import ButtonToggle, {
  ButtonToggleOption,
} from "components/button-toggle/button-toggle";
import Heading from "components/heading/heading";
import Icon from "components/icon/icon";
import useTranslation from "hooks/use-translation";
import calculateMinutesAgo from "utils/calculate-minutes-ago";

import useStyles from "./page-header.styles";

type Props = {
  title: string;
  updatedAt: number;
  selectedButtonIndex?: number;
  buttonToggleOptions?: ButtonToggleOption[];
};

const PageHeader: React.FC<Props> = ({
  title,
  updatedAt,
  selectedButtonIndex,
  buttonToggleOptions,
}) => {
  const $ = useStyles();
  const { t } = useTranslation();
  const [minutesAgo, setMinutesAgo] = useState(Date.now());

  useEffect(() => {
    setMinutesAgo(calculateMinutesAgo(updatedAt));
    const minutesAgeInterval = setInterval(() => {
      setMinutesAgo(calculateMinutesAgo(updatedAt));
    }, 20000);

    return () => clearInterval(minutesAgeInterval);
  }, [updatedAt]);

  return (
    <View style={$.header}>
      <View style={$.headerLeft}>
        <Heading size="s">{title}</Heading>
        <View style={$.poller}>
          <Icon name="Refresh" size={14} />
          <Body size="xs" color="textSecondary">
            {t("Dashboard/Body/LastUpdated", { minutesAgo })}
          </Body>
        </View>
      </View>
      {buttonToggleOptions && (
        <View style={$.headerRight}>
          <ButtonToggle
            selectedIndex={selectedButtonIndex}
            buttons={buttonToggleOptions}
          />
        </View>
      )}
    </View>
  );
};

export default PageHeader;
