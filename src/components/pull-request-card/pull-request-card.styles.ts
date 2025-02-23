import useMemoizedStyles from "hooks/use-memoized-styles";
import { ThemeColor } from "models/theme";

const useStyles = (accentColor: ThemeColor) =>
  useMemoizedStyles(({ spacing, colors, borderRadiuses }) => ({
    card: {
      overflow: "hidden",
      backgroundColor: colors.backgroundSurface,
      padding: spacing(3),
      paddingTop: spacing(2),
      borderRadius: borderRadiuses.sidebar,
      flexDirection: "column",
      gap: spacing(2),
    },
    borderLine: {
      position: "absolute",
      left: 0,
      top: -2,
      bottom: 0,
      borderStyle: "solid",
      borderWidth: 4,
      borderColor: colors[accentColor],
      marginLeft: -4,
      width: 1,
    },
    draftLine: {
      borderStyle: "dashed",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing(1),
      minHeight: spacing(5),
    },
    footer: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    left: {
      flexDirection: "row",
      alignItems: "center",
    },
    right: {
      flexDirection: "row",
      gap: spacing(2),
      alignItems: "center",
    },
    info: {
      flexDirection: "row",
      gap: spacing(1.5),
      marginLeft: spacing(5),
      alignItems: "center",
    },
    helper: {
      backgroundColor: colors.backgroundSecondary,
      color: colors.textSecondary,
      position: "absolute",
      width: 200,
      top: 2,
      right: 2,
      padding: spacing(1.5),
      borderRadius: borderRadiuses.sidebar,
    },
  }));
export default useStyles;
