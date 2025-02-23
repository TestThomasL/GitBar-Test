import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ spacing, colors, borderRadiuses }) => ({
    container: {
      flexDirection: "row",
      padding: spacing(1),
      backgroundColor: colors.backgroundSurface,
      borderRadius: borderRadiuses.sidebar,
    },
    button: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    activeButton: {
      backgroundColor: colors.backgroundCtaSecondary,
      paddingVertical: spacing(0.5),
      borderRadius: borderRadiuses.item,
    },
  }));

export default useStyles;
