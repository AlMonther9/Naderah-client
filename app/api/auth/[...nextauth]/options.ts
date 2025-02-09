import type { NextAuthOptions, User, Session, DefaultSession } from "next-auth";
import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

declare module "next-auth" {
  interface User {
    id?: string;
    first_name?: string;
    last_name?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: {
      id?: number;
      first_name?: string;
      last_name?: string;
      accessToken?: string;
      refreshToken?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    first_name?: string;
    last_name?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}auth/jwt/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    const data = await response.json();

    if (!response.ok) throw data;

    return {
      accessToken: data.access,
      refreshToken: refreshToken, // Refresh token remains same until rotation
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
}

export const options: NextAuthOptions = {
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "login",
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}auth/jwt/create/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await response.json();
          if (!response.ok) throw new Error(data.detail || "Login failed");

          return {
            id: credentials?.email,
            email: credentials?.email,
            accessToken: data.access,
            refreshToken: data.refresh,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "Signup",
      credentials: {
        first_name: { label: "First Name", type: "text" },
        last_name: { label: "Last Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        password2: { label: "Confirm Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}users/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                first_name: credentials?.first_name,
                last_name: credentials?.last_name,
                email: credentials?.email,
                password: credentials?.password,
                password2: credentials?.password2,
              }),
            }
          );

          const data = await response.json();
          if (!response.ok) {
            throw new Error(
              data.email?.[0] || data.password?.[0] || "Registration failed"
            );
          }

          return {
            id: data.user.id.toString(),
            email: data.user.email,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            accessToken: data.access,
            refreshToken: data.refresh,
          };
        } catch (error) {
          console.error("Signup error:", error);
          throw new Error(
            error instanceof Error ? error.message : "Registration failed"
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user && account) {
        return {
          ...token,
          ...user,
          expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes expiration
        };
      }

      // Return previous token if not expired
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // Attempt refresh
      const newTokens = await refreshAccessToken(token.refreshToken!);
      if (!newTokens) {
        delete token.accessToken;
        delete token.refreshToken;
        return token;
      }

      return {
        ...token,
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
        expiresAt: Date.now() + 15 * 60 * 1000,
      };
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        // id: token.id,
        first_name: token.first_name,
        last_name: token.last_name,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
      return session;
    },
  },

  jwt: {
    encode: async ({ secret, token }) => {
      return jwt.sign(token!, secret);
    },
    decode: async ({ secret, token }) => {
      try {
        return jwt.verify(token!, secret) as any;
      } catch (error) {
        console.error("JWT decode error:", error);
        return null;
      }
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
