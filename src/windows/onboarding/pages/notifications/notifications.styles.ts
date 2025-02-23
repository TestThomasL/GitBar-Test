import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing }) => ({
    wrapper: {
      alignItems: "center",
    },
    image: {
      width: "100%",
      borderRadius: 8,
      height: undefined,
      aspectRatio: 315 / 170,
    },
    content: {
      justifyContent: "center",
      alignItems: "center",
      maxWidth: 300,
      marginTop: spacing(6),
    },
  }));
export default useStyles;
