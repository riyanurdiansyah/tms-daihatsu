import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// const api_backend = process.env.NEXT_PUBLIC_APP_API_BACKEN;
const base_url = process.env.NEXTAUTH_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      // Customize credentials object if needed
      credentials: {},
      async authorize(credentials) {
        try {
          const { username, password } = credentials as {
            username: string;
            password: string;
          };

          const res = await fetch(`${base_url}/api/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });

          const data = await res.json();

          if (res.ok) {
            const user = data; // Assuming the user data is in the response
            return user;
          } else if (data.code === 404) {
            throw new Error(data.message || "Username not found");
          } else {
            throw new Error(data.message || "Invalid credentials");
          }
        } catch (error: any) {
          console.error("Authentication error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};
