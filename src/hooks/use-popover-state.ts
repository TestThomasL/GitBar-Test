import { useEffect, useState } from "react";
import { NativeEventEmitter, NativeModules } from "react-native";

const nativeModule = NativeModules.RNEventEmitter;
const EventEmitter = new NativeEventEmitter(nativeModule);

export enum PopoverState {
  OPEN = "Opened",
  CLOSED = "Closed",
}

const usePopoverState = () => {
  const [state, setState] = useState<PopoverState>(PopoverState.OPEN);

  useEffect(() => {
    EventEmitter.addListener("onPopoverState", ({ state: popoverState }) => {
      setState(popoverState);
    });

    return () => {
      EventEmitter.removeAllListeners("onPopoverState");
    };
  }, []);

  return state;
};

export default usePopoverState;
