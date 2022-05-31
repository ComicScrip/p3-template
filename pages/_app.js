import CurrentUserContextProvider from "../contexts/currentUserContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CurrentUserContextProvider>
        <Component {...pageProps} />
      </CurrentUserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
