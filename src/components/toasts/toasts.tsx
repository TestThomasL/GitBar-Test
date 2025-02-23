import React, { useContext, useMemo } from "react";
import { View } from "react-native";

import { ToastApiContext, ToastDataContext } from "contexts/toasts";
import { Toast as ToastType } from "models/toast";

import Toast from "./toast";
import useStyles from "./toasts.styles";

const MAX_CONCURRENT_TOASTS = 3;

const Toasts: React.FC = () => {
  const { removeToast } = useContext(ToastApiContext);
  const toasts = useContext(ToastDataContext);

  const $ = useStyles();

  const showableToasts = useMemo(
    () => toasts.slice(0, MAX_CONCURRENT_TOASTS),
    [toasts],
  );

  const renderToast = ({
    id,
    closeButton,
    duration,
    icon,
    message,
    type,
  }: ToastType) => (
    <Toast
      key={id}
      closeButton={closeButton}
      duration={duration}
      icon={icon}
      message={message}
      type={type}
      removeToast={() => {
        removeToast(id);
      }}
    />
  );

  if (showableToasts.length === 0) {
    return null;
  }

  return (
    <View style={$.topContainer} pointerEvents="box-none">
      {showableToasts.reverse().map((toast) => renderToast(toast))}
    </View>
  );
};

export default Toasts;
