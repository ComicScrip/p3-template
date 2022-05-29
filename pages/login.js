import Layout from "../components/Layout";
import { CurrentUserContext } from "../contexts/currentUserContext";
import { signOut } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useContext } from "react";

export default function LoginPage({ csrfToken }) {
  const { currentUserProfile } = useContext(CurrentUserContext);
  const { query } = useRouter();

  return (
    <Layout pageTitle={"Login"}>
      {currentUserProfile ? (
        <>
          Connecté en tant que {currentUserProfile.email} <br />
          <button data-cy="disconnectBtn" onClick={() => signOut()}>
            Log out
          </button>
        </>
      ) : (
        <>
          <h1>Log in</h1>
          <form
            method="post"
            action="/api/auth/callback/credentials"
            data-cy="loginForm"
          >
            <input
              id="csrfToken"
              name="csrfToken"
              type="hidden"
              defaultValue={csrfToken}
            />
            <label>
              Email :
              <input
                id="username"
                name="username"
                type="text"
                placeholder="me@something.com"
                data-cy="email"
              />
            </label>
            <label>
              Password :
              <input
                name="password"
                type="password"
                id="password"
                data-cy="password"
              />
            </label>
            <button data-cy="credentials-login-btn" type="submit">
              Try those credentials
            </button>
            {query.error === "CredentialsSignin" && (
              <p>Incorrect credentials, please try again.</p>
            )}
            <Link href="/signup">
              <a>Not registered ?</a>
            </Link>
          </form>
        </>
      )}
    </Layout>
  );
}

const getCsrfTokenAndSetCookies = async ({ res, query }) => {
  // to make it work on Vercel
  let baseUrl = process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
  // capturing the callback url if any, which should include the current domain for security ?
  const callbackUrlIsPresent = typeof query?.callbackUrl === "string";
  const callbackUrlIsValid =
    callbackUrlIsPresent && query?.callbackUrl.startsWith(baseUrl);
  const host = callbackUrlIsValid ? query?.callbackUrl : baseUrl;
  const redirectURL = encodeURIComponent(host);
  // getting both the csrf form token and (next-auth.csrf-token cookie + next-auth.callback-url cookie)
  const csrfUrl = `${baseUrl}/api/auth/csrf?callbackUrl=${redirectURL}`;
  const csrfResponse = await fetch(csrfUrl);
  const { csrfToken } = await csrfResponse.json();
  const { headers } = csrfResponse;
  // placing the cookies
  const [csrfCookie, redirectCookie] = headers.get("set-cookie").split(",");
  res.setHeader("set-cookie", [csrfCookie, redirectCookie]);
  // placing form csrf token
  return csrfToken;
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfTokenAndSetCookies(context),
    },
  };
}
