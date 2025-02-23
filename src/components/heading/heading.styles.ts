import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(() => ({
    numberOfLines: {
      flex: 1,
    },
  }));
export default useStyles;
