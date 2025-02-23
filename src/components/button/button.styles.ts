import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(
    ({
      colors,
      borderRadiuses,
      fontWeights,
      fontSizes,
      lineHeights,
      spacing,
    }) => ({
      button: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: borderRadiuses.button,
        // Button Sizes
        xs: {
          paddingHorizontal: spacing(3),
          paddingVertical: spacing(1.5),
        },
        s: {
          paddingHorizontal: spacing(3.5),
          paddingVertical: spacing(2),
        },
        m: {
          paddingHorizontal: spacing(4),
          paddingVertical: spacing(3),
        },
        l: {
          paddingHorizontal: spacing(5),
          paddingVertical: spacing(3.5),
        },
        neutral: {
          backgroundColor: colors.backgroundCta,
        },
        danger: {
          backgroundColor: colors.backgroundCtaDanger,
        },
        secondary: {
          backgroundColor: colors.backgroundCtaSecondary,
        },
      },
      disabled: {
        opacity: 0.5,
      },
      text: {
        textAlign: "center",
        // Button Sizes
        xs: {
          fontSize: fontSizes.buttonXS,
          lineHeight: lineHeights.buttonXS,
        },
        s: {
          fontSize: fontSizes.buttonS,
          lineHeight: lineHeights.buttonS,
        },
        m: {
          fontSize: fontSizes.buttonM,
          lineHeight: lineHeights.buttonM,
        },
        l: {
          fontSize: fontSizes.buttonL,
          lineHeight: lineHeights.buttonL,
        },
        neutral: {
          color: colors.textOnCta,
        },
        danger: {
          color: colors.textOnCtaDanger,
        },
        secondary: {
          color: colors.textOnCtaSecondary,
        },
      },
      bold: {
        fontWeight: fontWeights.bold,
      },
    }),
  );

export default useStyles;
