import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ colors }) => ({
    wrapper: {
      flex: 1,
      backgroundColor: colors.background,
      width: "100%",
      height: "100%",
    },
    blobOne: {
      position: "absolute",
      width: 1000,
      height: 1000,
      left: 200,
      top: 50,
    },
    blobTwo: {
      position: "absolute",
      width: 750,
      height: 750,
      top: -450,
      left: -300,
    },
  }));

export default useStyles;
