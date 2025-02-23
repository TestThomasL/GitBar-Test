import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ colors, fontWeights }) => ({
    attendee: {
      justifyContent: "center",
      backgroundColor: colors.backgroundCtaSecondary,
    },
    initials: {
      fontWeight: fontWeights.bold,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      textAlignVertical: "center",
    },
    border: {
      borderWidth: 2,
      borderColor: "transparent",
    },
    borderApproved: {
      borderColor: colors.accentGreen,
    },
    borderWaitingFor: {
      borderColor: colors.accentYellow,
    },
    borderRejected: {
      borderColor: colors.accentRed,
    },
    borderTransparent: {
      borderColor: "transparent",
    },
  }));
export default useStyles;
