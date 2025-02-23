import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing }) => ({
    wrapper: {
      gap: spacing(5),
    },
  }));
export default useStyles;
