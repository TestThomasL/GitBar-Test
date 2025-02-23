import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing, colors }) => ({
    container: {
      height: spacing(12),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    border: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  }));
export default useStyles;
