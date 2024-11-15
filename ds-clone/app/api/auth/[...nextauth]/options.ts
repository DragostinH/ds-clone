import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "@/app/libs/prismadb";
const process = require("process");
import bcrypt from "bcryptjs"; // Note: Check the library is correctly imported

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, user, token }) {
      if (session && session.user) {
        if (token.sub) {
          (session.user as { id: string }).id = token.sub;
        }
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(client),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) throw new Error("Missing credentials");

        const user = await prisma?.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user?.password) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(credentials?.password, user.password);

        if (!isMatch) {
          // console.log(await bcrypt.decode(credentials?.password, 10));

          throw new Error("Invalid credentials");
        }

        // TODO: Add user status for whenever you login

        const statusKey = `status:${user.id}`;
        

        return { id: user.id, nickName: user?.nickname, email: user.email, image: user.image };
      },
    }),
  ],
  // pages:{},
};
