import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing }) => ({
    container: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing(1),
      flex: 1,
    },
    buttonGroup: {
      flexDirection: "column",
      gap: spacing(1),
    },
  }));

export default useStyles;
