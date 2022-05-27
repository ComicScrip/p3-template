import Head from "next/head";

export default function Layout({ children, pageTitle = "" }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Meta description content goes here."
        />
        <title>{pageTitle}</title>
      </Head>
      {children}
    </>
  );
}
