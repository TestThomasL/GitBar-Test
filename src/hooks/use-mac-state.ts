import { useEffect, useState } from "react";

import { MacState, addMacStateListener } from "modules/app-module";

const useMacState = () => {
  const [state, setState] = useState<MacState>(MacState.UNLOCKED);

  useEffect(() => {
    const subscription = addMacStateListener((event) => {
      setState(event.state);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return state;
};

export default useMacState;
