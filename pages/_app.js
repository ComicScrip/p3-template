import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import CurrentUserContextProvider from "../contexts/currentUserContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider
      session={session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      <CurrentUserContextProvider>
        <Component {...pageProps} />
      </CurrentUserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
