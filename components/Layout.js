import Head from "next/head";
import Header from "./Header";

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="my awesome website" />
      </Head>
      <Header />
      {children}
    </>
  );
}
