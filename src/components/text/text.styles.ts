import useMemoizedStyles from "hooks/use-memoized-styles";

const useStyles = () =>
  useMemoizedStyles(({ colors, fontSizes, fontFamilies }) => ({
    text: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.text,
      color: colors.text,
    },
  }));

export default useStyles;
