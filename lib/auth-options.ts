import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { getUser } from "@/app/actions/user";
import { prisma } from "@/prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an user id from a provider.
      if (token.sub) session.user.id = token.sub;
      const userData = await getUser(session.user.id);
      session.user.selectedProfile = userData?.selectedProfile;
      return session;
    },
  },
};
