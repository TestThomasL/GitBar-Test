import { StyleProp, ViewStyle } from "react-native";

export type ChangeEventPayload = {
  nativeEvent: {
    value: string;
  };
};

export type PickerOption = {
  label: string;
  value: string;
};

export type PickerNativeModuleProps = {
  options: PickerOption[];
  selectedValue?: string;
  onValueChange: (value: ChangeEventPayload) => void;
  style?: StyleProp<ViewStyle>;
};
