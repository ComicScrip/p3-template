import Head from "next/head";
import { signIn } from "next-auth/react";

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="my awesome website" />
      </Head>
      <button data-cy="loginBtn" onClick={() => signIn()}>
        Log in
      </button>
      {children}
    </>
  );
}
