import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing, colors, borderRadiuses }) => ({
    card: {
      overflow: "hidden",
      backgroundColor: colors.backgroundSurface,
      padding: spacing(3),
      paddingTop: spacing(2),
      borderRadius: borderRadiuses.sidebar,
      flexDirection: "column",
      gap: spacing(1),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing(1),
      minHeight: spacing(5),
    },
    footer: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    right: {
      flexDirection: "row",
      gap: spacing(1),
      alignItems: "center",
    },
  }));
export default useStyles;
