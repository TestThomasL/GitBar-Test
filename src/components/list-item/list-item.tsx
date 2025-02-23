import React, { PropsWithChildren } from "react";
import { View } from "react-native";

import Body from "components/body/body";

import useStyles from "./list-item.styles";

export type ListItmeProps = {
  label: string;
  border?: boolean;
};

const ListItem: React.FC<ListItmeProps & PropsWithChildren> = ({
  label,
  border,
  children,
}) => {
  const $ = useStyles();

  return (
    <View style={[$.container, border && $.border]}>
      <Body size="s">{label}</Body>
      {children}
    </View>
  );
};

export default ListItem;
