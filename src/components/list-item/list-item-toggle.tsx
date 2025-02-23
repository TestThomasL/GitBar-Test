import React from "react";
import { Switch } from "react-native-macos";

import ListItem, { ListItmeProps } from "./list-item";

type Props = {
  onToggle: (value: boolean) => void;
  value: boolean;
  disabled?: boolean;
} & ListItmeProps;

const ListItemToggle: React.FC<Props> = ({
  label,
  onToggle,
  value,
  border,
  disabled,
}) => (
  <ListItem label={label} border={border}>
    <Switch disabled={disabled} onValueChange={onToggle} value={value} />
  </ListItem>
);

export default ListItemToggle;
