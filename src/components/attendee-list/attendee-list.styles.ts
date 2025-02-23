import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = (size: number) =>
  useMemoizedStyles(
    ({ borderRadiuses, spacing }) => ({
      stack: {
        flexDirection: "row",
        marginRight: spacing(2),
        alignItems: "center",
      },
      container: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -1 * (size - spacing(4)),
      },
      seperator: {
        borderRadius: borderRadiuses.round,
        width: size + 2,
        height: size + 2,
      },
      icon: {
        marginLeft: -1 * size,
      },
    }),
    [size],
  );
export default useStyles;
