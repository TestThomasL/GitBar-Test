import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ colors, borderRadiuses, spacing }) => ({
    container: {
      backgroundColor: colors.backgroundSurface,
      borderRadius: borderRadiuses.sidebar,
      padding: spacing(2),
      width: 48,
      gap: spacing(1),
      justifyContent: "space-between",
    },
    section: {
      gap: spacing(1.5),
    },
  }));
export default useStyles;
