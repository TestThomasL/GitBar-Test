export type AnyFunction<T = unknown, K = unknown> = (
  ...args: T extends [] ? T[] : any[]
) => K extends unknown ? any : K;

export type UnArray<T> = T extends Array<infer U> ? U : T; // Unwrap array from T

export type NonNullable<T> = Exclude<T, null | undefined>; // Remove null and undefined from T

export type ValueOf<T> = T[keyof T]; // Get the value of a key in a type
