import { randomUUID } from "expo-crypto";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { Toast } from "models/toast";

export type AddToastParams = Omit<Toast, "id">;

export type ToastApi = {
  addToast: (toast: AddToastParams) => void;
  removeToast: (toastId: string) => void;
};

export type State = {
  toasts: Toast[];
};
const defaultState: State = { toasts: [] };

export enum ActionType {
  ADD_TOAST,
  REMOVE_TOAST,
}

type ActionAddToast = {
  type: ActionType.ADD_TOAST;
  payload: AddToastParams;
};
type ActionRemoveToast = {
  type: ActionType.REMOVE_TOAST;
  payload: string;
};

export type Action = ActionAddToast | ActionRemoveToast;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_TOAST: {
      return {
        toasts: [...state.toasts, { id: randomUUID(), ...action.payload }],
      };
    }
    case ActionType.REMOVE_TOAST: {
      return {
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};

export const ToastDataContext = createContext<Toast[]>([]);
export const ToastApiContext = createContext<ToastApi>({
  addToast: () => {},
  removeToast: () => {},
});

const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [{ toasts }, dispatch] = useReducer(reducer, defaultState);

  const api = useMemo(
    () => ({
      addToast: (toast: AddToastParams) => {
        dispatch({ type: ActionType.ADD_TOAST, payload: toast });
      },
      removeToast: (id: string) => {
        dispatch({ type: ActionType.REMOVE_TOAST, payload: id });
      },
    }),
    [],
  );

  return (
    <ToastDataContext.Provider value={toasts}>
      <ToastApiContext.Provider value={api}>
        {children}
      </ToastApiContext.Provider>
    </ToastDataContext.Provider>
  );
};

export const useToast = () => useContext(ToastApiContext);

export default ToastProvider;
