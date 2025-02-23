export type FontFamily = "Lato";

export type FontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type FontStyle = "italic" | "normal";

type FontStyleWeight<T> = {
  "100"?: T;
  "200"?: T;
  "300"?: T;
  "400": T;
  "500"?: T;
  "600"?: T;
  "700"?: T;
  "800"?: T;
  "900"?: T;
};

export type FontStyles<T> = {
  normal: FontStyleWeight<T>;
  italic?: FontStyleWeight<T>;
};
