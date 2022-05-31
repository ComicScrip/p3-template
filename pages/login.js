import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function SignIn({ csrfToken }) {
  const { currentUserProfile } = useContext(CurrentUserContext);

  const router = useRouter();
  const { error } = router.query;

  return (
    <>
      <h1>Log In</h1>
      {currentUserProfile ? (
        <>
          <p>Signed in as {currentUserProfile.email}</p>
          <button data-cy="disconnectBtn" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      ) : (
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Username
            <input name="username" data-cy="username" type="text" />
          </label>
          <label>
            Password
            <input name="password" data-cy="password" type="password" />
          </label>
          {error === "CredentialsSignin" && <p>Invalid credentials</p>}
          <button data-cy="signinBtn" type="submit">
            Sign in
          </button>
        </form>
      )}
    </>
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
