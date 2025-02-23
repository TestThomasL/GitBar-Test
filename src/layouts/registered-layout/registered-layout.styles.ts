import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing }) => ({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginRight: spacing(16),
      paddingVertical: spacing(2.5),
    },
  }));
export default useStyles;
