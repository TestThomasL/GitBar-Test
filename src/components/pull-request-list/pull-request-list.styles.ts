import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing }) => ({
    list: {
      gap: spacing(2),
      paddingBottom: spacing(0.5),
    },
  }));
export default useStyles;
