import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(() => ({
    link: {
      flexDirection: "row",
      alignItems: "center",
    },
  }));
export default useStyles;
