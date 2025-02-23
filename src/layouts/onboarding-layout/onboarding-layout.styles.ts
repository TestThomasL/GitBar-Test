import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing }) => ({
    container: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: spacing(9),
      paddingTop: spacing(16),
      paddingBottom: spacing(9),
    },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "center",
      gap: spacing(1.5),
    },
    button: {
      minWidth: 80,
    },
  }));
export default useStyles;
