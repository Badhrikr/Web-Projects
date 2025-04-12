import dynamic from "next/dynamic";
import React from "react";
import useMicrosoftSignedIn from "../../../../../../hooks/use-microsoft-signed-In";
const Login = dynamic(
  () => import("@microsoft/mgt-react").then((module) => module.Login),
  {
    ssr: false,
    loading: () => (
      <div>
        <p className="text-theme-secondary">Loading</p>
      </div>
    ),
  }
);

function CheckLoggedIn<P>(Component: React.ComponentType<P>): React.FC<P> {
  const WithAuth: React.FC<P> = (props) => {
    const [isSignedIn] = useMicrosoftSignedIn();

    return (
      <React.Fragment>
        {isSignedIn ? (
          <React.Fragment>
            <div className="w-full flex justify-end">
              <Login className="!text-theme-secondary" />
            </div>
            <Component {...(props as any)} />
          </React.Fragment>
        ) : (
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Login />
            <h3 className="text-theme-secondary text-center">
              Please login with your microsoft account to continue.
            </h3>
          </div>
        )}
      </React.Fragment>
    );
  };

  return WithAuth;
}

export default CheckLoggedIn;
