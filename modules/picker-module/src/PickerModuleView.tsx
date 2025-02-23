import { requireNativeView } from "expo";
import * as React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { PickerNativeModuleProps, PickerOption } from "./PickerModule.types";

const NativeView: React.ComponentType<PickerNativeModuleProps> =
  requireNativeView("PickerModule");

const pickerStyle = StyleSheet.create({
  select: {
    height: 24,
  },
});

type PickerProps = {
  options: PickerOption[];
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  selectedValue?: string;
};

const Picker: React.FC<PickerProps> = ({
  style,
  options,
  onValueChange,
  selectedValue,
}) => (
  <View>
    <NativeView
      options={options}
      selectedValue={selectedValue}
      onValueChange={({ nativeEvent }) => onValueChange(nativeEvent.value)}
      style={[style, pickerStyle.select]}
    />
  </View>
);

export default Picker;
