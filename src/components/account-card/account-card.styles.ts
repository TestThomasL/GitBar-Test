import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ colors, spacing }) => ({
    card: {
      position: "relative",
      paddingVertical: spacing(2),
      flexDirection: "row",
      alignItems: "center",
    },
    border: {
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    info: {
      marginLeft: spacing(3),
      marginBottom: spacing(0.5),
    },
    right: {
      marginLeft: "auto",
      gap: spacing(2),
      flexDirection: "row",
      alignItems: "center",
    },
    type: {
      bottom: -4,
      right: -4,
      zIndex: 1,
      position: "absolute",
    },
  }));
export default useStyles;
