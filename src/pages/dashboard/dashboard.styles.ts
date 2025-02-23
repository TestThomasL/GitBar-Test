import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing }) => ({
    container: {
      paddingTop: spacing(2.5),
      gap: spacing(2),
      flex: 1,
      flexDirection: "column",
    },
  }));
export default useStyles;
