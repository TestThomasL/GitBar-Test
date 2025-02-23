import React from "react";
import { View } from "react-native";

import Body from "components/body/body";
import Button from "components/button/button";
import Heading from "components/heading/heading";
import Spacer from "components/spacer/spacer";
import useTranslation from "hooks/use-translation";

import useStyles from "./error-container.styles";

type Props = {
  errors: Error[];
  onErrorRetry?: () => void;
};

const ErrorContainer: React.FC<Props> = ({ errors, onErrorRetry }) => {
  const $ = useStyles();
  const { t } = useTranslation();

  return (
    <View style={$.errorContainer}>
      <Heading size="x2s">{t("ErrorContainer/Heading/Error")}</Heading>
      {errors.map((error) => (
        <Body key={error.message} size="xs">
          ⏺︎ {error.message}
        </Body>
      ))}
      {onErrorRetry && (
        <>
          <Spacer mt={2} />
          <Button
            onPress={onErrorRetry}
            label={t("ErrorContainer/Button/Retry")}
            type="secondary"
            size="xs"
          />
        </>
      )}
    </View>
  );
};

export default ErrorContainer;
