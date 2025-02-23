import React from "react";

import Picker, { PickerOption } from "modules/picker-module";

import ListItem, { ListItmeProps } from "./list-item";

type Props = {
  onValueChange: (value: string) => void;
  selectedValue: string;
  width?: number;
  pickerItems: PickerOption[];
} & ListItmeProps;

// TODO FIX
const ListItemPicker: React.FC<Props> = ({
  label,
  onValueChange,
  selectedValue,
  border,
  pickerItems,
  width = 150,
}) => (
  <ListItem label={label} border={border}>
    <Picker
      style={{ width }}
      selectedValue={selectedValue}
      onValueChange={(value) => onValueChange(value)}
      options={pickerItems}
    />
  </ListItem>
);

export default ListItemPicker;
