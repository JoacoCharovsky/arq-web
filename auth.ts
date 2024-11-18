import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./src/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  adapter: MongoDBAdapter(client),
});
