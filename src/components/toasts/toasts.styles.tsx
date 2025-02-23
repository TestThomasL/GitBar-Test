import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing, borderRadiuses, colors }) => ({
    topContainer: {
      position: "absolute",
      height: "100%",
      top: spacing(2.5),
      left: spacing(2.5),
      right: spacing(2.5),
    },
    message: { flex: 1 },
    toast: {
      borderRadius: borderRadiuses.modal,
      padding: spacing(3),
      width: "100%",
      flexDirection: "column",
      backgroundColor: colors.backgroundCta,
    },
    error: {
      backgroundColor: colors.backgroundCtaDanger,
    },
    toastTop: {
      flexDirection: "row",
    },
  }));

export default useStyles;
