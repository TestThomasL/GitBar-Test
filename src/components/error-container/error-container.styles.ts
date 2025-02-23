import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing, colors, borderRadiuses }) => ({
    errorContainer: {
      padding: spacing(2),
      paddingTop: spacing(1),
      borderRadius: borderRadiuses.input,
      backgroundColor: colors.backgroundCtaDanger,
    },
  }));
export default useStyles;
