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
      maxWidth: 350,
      flexDirection: "row",
      gap: spacing(1),
    },
    input: {
      width: 350,
    },
  }));

export default useStyles;
