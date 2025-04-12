import { useEffect, useState } from "react";

function useMicrosoftSignedIn(): [boolean] {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const initializer = async () => {
    const Providers = (await import("@microsoft/mgt-element")).Providers;
    const ProviderState = (await import("@microsoft/mgt-element"))
      .ProviderState;

    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();
  };

  useEffect(() => {
    initializer();

    // return () => {
    //   Providers.removeProviderUpdatedListener(updateState);
    // };
  }, []);

  return [isSignedIn];
}

export default useMicrosoftSignedIn;
