import { useDispatch as useDispatchDefault } from "react-redux";

import { AppDispatch } from "store/configure";

// Use throughout your app instead of `useDispatch` from react-redux
const useDispatch = () => useDispatchDefault<AppDispatch>();

export default useDispatch;
