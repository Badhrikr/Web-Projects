import { AuthClientTokens } from "@react-keycloak/core/lib/types";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiInstance from "../common/http-service";
import { keycloakInitOptions, keycloakInstance } from "../helpers/keycloak";
import CookieConsent from "../shared/components/cookie-consent";
import LoadingScreen from "../shared/components/loading-screen";
import "../styles/globals.scss";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType & any;
  };
};

function App({ Component, pageProps }: ComponentWithPageLayout) {
  const tokenEventHandler = ({ token }: AuthClientTokens) => {
    ApiInstance().setToken = token;
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=1024" charSet="utf-8"></meta>
        <meta name="description" content="DCEP" />
        <title> DCEP </title>
      </Head>

      <ReactKeycloakProvider
        onTokens={tokenEventHandler}
        LoadingComponent={<LoadingScreen />}
        initOptions={keycloakInitOptions}
        authClient={keycloakInstance}
        autoRefreshToken={true}
      >
        {Component.PageLayout ? (
          <Component.PageLayout>
            <NextNProgress />
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <div>
            <NextNProgress />
            <Component {...pageProps} />
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={true}
          closeOnClick
        />

        <CookieConsent />
      </ReactKeycloakProvider>
    </>
  );
}

export default App;
