import React, { memo } from "react";
import { GestureResponderEvent, Linking, TouchableOpacity } from "react-native";
import {
  ActionSheetIOS,
  ActionSheetIOSOptions,
  View,
} from "react-native-macos";

import Attendee from "components/attendee/attendee";
import AttendeeList from "components/attendee-list/attendee-list";
import Body from "components/body/body";
import Heading from "components/heading/heading";
import Icon from "components/icon/icon";
import Spacer from "components/spacer/spacer";
import useTranslation from "hooks/use-translation";
import { Attendee as AttendeeType } from "models/attendee";
import { ThemeColor } from "models/theme";

import useStyles from "./pull-request-card.styles";

type Props = {
  id: string;
  title: string;
  author: AttendeeType;
  reviewers: AttendeeType[];
  repoName: string;
  url: string;
  amountOfComments?: number;
  actionSheetOptions?: ActionSheetIOSOptions;
  actionSheetCallback?: (
    buttonIndex: number,
    id: string,
    repoName: string,
  ) => void;
  accentColor: ThemeColor;
  isDraft: boolean;
};

const PullRequestCard: React.FC<Props> = ({
  title,
  author,
  reviewers,
  url,
  amountOfComments,
  actionSheetOptions,
  actionSheetCallback,
  accentColor,
  id,
  repoName,
  isDraft,
}) => {
  const $ = useStyles(accentColor);
  const { t } = useTranslation();

  const onPress = async (event: GestureResponderEvent) => {
    if ("button" in event.nativeEvent && event.nativeEvent.button === 2) {
      if (actionSheetOptions && actionSheetCallback) {
        ActionSheetIOS.showActionSheetWithOptions(
          actionSheetOptions,
          (buttonIndex) => {
            actionSheetCallback(buttonIndex, id, repoName);
          },
        );
      }
      return;
    }
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={{ overflow: "hidden" }}>
      <TouchableOpacity
        accessibilityRole="button"
        style={$.card}
        onPress={onPress}
      >
        <View style={[$.borderLine, isDraft && $.draftLine]} />
        <View style={$.header}>
          {isDraft && <Icon name="EditPencil" size={20} />}
          <Spacer mb={isDraft ? 1 : 0}>
            <Heading numberOfLines={1} size="x2s">
              {title}
            </Heading>
          </Spacer>
        </View>
        <View style={$.footer}>
          <View style={$.left}>
            <Body size="s">{t("PullRequestCard/Body/Author")}</Body>
            <Spacer ml={1.5} />
            <Attendee
              name={author.name}
              size={24}
              avatarUrl={author.avatarUrl}
            />
            <Spacer ml={3} />
            {reviewers.length > 0 && (
              <>
                <Body size="s">{t("PullRequestCard/Body/Reviewers")}</Body>
                <Spacer ml={1.5} />
                <AttendeeList attendees={reviewers} profileIconSize={24} />
              </>
            )}
          </View>
          <View style={$.right}>
            {amountOfComments !== undefined && (
              <View style={$.info}>
                <Body size="s">{amountOfComments}</Body>
                <Icon name="Comment" size={20} />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(PullRequestCard);
