import React, { useEffect } from "react";
import { Pressable, View } from "react-native";

import Body from "components/body/body";
import Icon, { IconName } from "components/icon/icon";
import Spacer from "components/spacer/spacer";
import { ThemeColor } from "models/theme";
import { ToastType } from "models/toast";

import useStyles from "./toasts.styles";

type Props = {
  closeButton?: boolean;
  duration?: number;
  icon?: IconName;
  iconColor?: ThemeColor;
  message: string;
  removeToast: () => void;
  type?: ToastType;
};

const Toast: React.FC<Props> = ({
  closeButton = true,
  duration,
  icon,
  iconColor = "icon",
  message,
  removeToast,
  type = "neutral",
}) => {
  const $ = useStyles();
  const timeoutId = React.useRef<NodeJS.Timeout | null>();

  const clearToastTimeout = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  useEffect(() => {
    if (!timeoutId.current && duration) {
      timeoutId.current = setTimeout(removeToast, duration);
    }
  }, [duration, removeToast]);

  const onClose = () => {
    removeToast();
    clearToastTimeout();
  };

  return (
    <View>
      <Spacer mb={2}>
        <View style={[$.toast, type === "error" && $.error]}>
          <View style={$.toastTop}>
            {icon && (
              <Spacer mr={3}>
                <Icon name={icon} color={iconColor} size={24} />
              </Spacer>
            )}
            <View style={$.message}>
              <Body color="textOnCta">{message}</Body>
            </View>
            {(closeButton || !duration) && (
              <Spacer mt={0.5} ml={2}>
                <Pressable
                  hitSlop={10}
                  accessibilityRole="button"
                  onPress={() => {
                    onClose();
                  }}
                >
                  <Icon name="Cross" color="iconOnCta" size={20} />
                </Pressable>
              </Spacer>
            )}
          </View>
        </View>
      </Spacer>
    </View>
  );
};

export default Toast;
