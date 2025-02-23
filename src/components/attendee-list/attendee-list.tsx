import React, { useMemo } from "react";
import { View } from "react-native";

import Attendee from "components/attendee/attendee";
import { Attendee as AttendeeType, Vote } from "models/attendee";

import useStyles from "./attendee-list.styles";

type Props = {
  attendees: AttendeeType[];
  profileIconSize?: number;
};

const AttendeeList: React.FC<Props> = ({ attendees, profileIconSize = 20 }) => {
  const $ = useStyles(profileIconSize);

  const sortedAttendees = useMemo(
    () =>
      attendees.sort((a, b) => {
        if (a.vote === Vote.Approved) return -1;
        if (b.vote === Vote.Approved) return 1;
        if (a.vote === Vote.WaitingFor) return -1;
        if (b.vote === Vote.WaitingFor) return 1;
        if (a.vote === Vote.Rejected) return -1;
        if (b.vote === Vote.Rejected) return 1;
        return 0;
      }),
    [attendees],
  );

  return (
    <View style={$.stack}>
      {sortedAttendees.map(({ avatarUrl, name, vote }, index) => (
        <View
          style={[
            index > 0 && $.container,
            {
              zIndex: sortedAttendees.length - index,
            },
          ]}
          key={name}
        >
          {index > 0 && <View style={$.seperator} />}
          <View style={[index > 0 && $.icon]}>
            <Attendee
              name={name}
              avatarUrl={avatarUrl}
              size={profileIconSize}
              vote={vote}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default AttendeeList;
