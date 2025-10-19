// Debug: log para verificar variable de entorno
console.log("NEXTAUTH_TRUST_HOST:", process.env.NEXTAUTH_TRUST_HOST);
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getNativeClient } from "@/lib/db";

export const authOptions: NextAuthConfig = {
  providers: [Google, Github],
  // Use lazy client so importing this file during build doesn't crash when MONGODB_URI is missing
  adapter: (() => {
    const client = getNativeClient();
    if (!client) {
      // In build or environments without DB we still need an adapter; MongoDBAdapter expects a client
      // Returning undefined defers adapter initialization; NextAuth will error at runtime if used without DB
      return undefined as unknown as ReturnType<typeof MongoDBAdapter>;
    }
    return MongoDBAdapter(client);
  })(),
  trustHost: true, // Permite que NextAuth confíe en el host (necesario para Docker y producción)
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
