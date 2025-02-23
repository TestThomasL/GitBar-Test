import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ borderRadiuses, colors }) => ({
    button: {
      justifyContent: "center",
      aspectRatio: 1,
      alignItems: "center",
      borderRadius: borderRadiuses.item,
    },
    danger: {
      backgroundColor: colors.backgroundCtaDanger,
    },
    secondary: {
      backgroundColor: colors.backgroundCtaSecondary,
    },
    neutral: {
      backgroundColor: colors.backgroundCta,
    },
  }));
export default useStyles;
