import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing }) => ({
    container: {
      flex: 1,
      flexDirection: "row",
      gap: spacing(3),
      paddingHorizontal: spacing(2.5),
    },
  }));
export default useStyles;
