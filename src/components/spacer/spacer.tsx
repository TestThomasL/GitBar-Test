import React, { PropsWithChildren } from "react";
import { View, ViewProps, ViewStyle } from "react-native";

import { ThemeSpacingScale } from "constants/theme";
import useTheme from "hooks/use-theme";

type SpacingProperty =
  | "m" // margin
  | "mb" // marginBottom
  | "ml" // marginLeft
  | "mr" // marginRight
  | "mt" // marginTop
  | "mx" // marginHorizontal
  | "my" // marginVertical
  | "p" // padding
  | "pb" // paddingBottom
  | "pl" // paddingLeft
  | "pr" // paddingRight
  | "pt" // paddingTop
  | "px" // paddingHorizontal
  | "py"; // paddingVertical

export type SpacerProps = Partial<Record<SpacingProperty, ThemeSpacingScale>>;

type Props = SpacerProps & PropsWithChildren & Pick<ViewProps, "testID">;

const Spacer: React.FC<Props> = ({
  children,
  m,
  mb,
  ml,
  mr,
  mt,
  mx,
  my,
  p,
  pb,
  pl,
  pr,
  pt,
  px,
  py,
}) => {
  const { spacing } = useTheme();
  const style = React.useMemo(() => {
    const styles: ViewStyle = {};
    if (m) styles.margin = spacing(m);
    if (mb) styles.marginBottom = spacing(mb);
    if (ml) styles.marginLeft = spacing(ml);
    if (mr) styles.marginRight = spacing(mr);
    if (mt) styles.marginTop = spacing(mt);
    if (mx) styles.marginHorizontal = spacing(mx);
    if (my) styles.marginVertical = spacing(my);
    if (p) styles.padding = spacing(p);
    if (pb) styles.paddingBottom = spacing(pb);
    if (pl) styles.paddingLeft = spacing(pl);
    if (pr) styles.paddingRight = spacing(pr);
    if (pt) styles.paddingTop = spacing(pt);
    if (px) styles.paddingHorizontal = spacing(px);
    if (py) styles.paddingVertical = spacing(py);
    return styles;
  }, [m, mb, ml, mr, mt, mx, my, p, pb, pl, pr, pt, px, py, spacing]);
  return <View style={style}>{children}</View>;
};

export default Spacer;
