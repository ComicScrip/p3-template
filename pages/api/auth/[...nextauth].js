import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  findByEmail,
  getSafeAttributes,
  verifyPassword,
} from "../../../models/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username, password }) {
        const user = await findByEmail(username);
        if (user && (await verifyPassword(user.hashedPassword, password))) {
          // If no error and we have user data, return it
          return getSafeAttributes(user);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
