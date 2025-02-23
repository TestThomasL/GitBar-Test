import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(() => ({
    image: {
      width: "100%",
      borderRadius: 8,
      height: undefined,
      aspectRatio: 315 / 170,
    },
  }));
export default useStyles;
