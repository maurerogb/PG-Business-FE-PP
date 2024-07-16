// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginApi } from "api/login";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  jwt: {
    signingKey: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  //  Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const res = await loginApi({
            username: credentials?.username,
            password: credentials?.password,
          });

          const user = await res.json();

          if (res.ok && user) {
            // Any object returned will be saved in `user` property of the JWT

            return {
              id: user.token,
              name: user.subject,
              email: user.subject,
              jwt: user.token,
              aniebiet: `aniebie`,
              roel: "roel",
            };
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            throw new Error("api could not be reach");

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (e) {
          throw new Error("api could not be reach");
        }
      },

      callbacks: {
        jwt({ token, user }) {
          console.log(token, user);
          return { ...token, ...user };
        },

        session({ session, token, user }) {
          session.user = token;

          return session;
        },
      },
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
