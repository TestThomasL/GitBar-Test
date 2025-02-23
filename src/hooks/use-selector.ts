import {
  TypedUseSelectorHook,
  useSelector as useSelectorDefault,
} from "react-redux";

import { RootState } from "store/configure";

// Use throughout your app instead of `useSelector` from react-redux
const useSelector: TypedUseSelectorHook<RootState> = useSelectorDefault;

export default useSelector;
