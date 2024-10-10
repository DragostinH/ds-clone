import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/app/lib/db";
import User from "@/api/models/User";
const bcrypt = require('bcryptjs');


export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) throw new Error("Missing credentials");

        const user = await User.findOne({
          email: credentials.email,
          password: credentials.password,
        })

        if (!user || !user?.password) throw new Error("Invalid credentials");

        const { password, _id, ...rest } = user.toObject();
        const isMatch = await bcrypt.compare(credentials?.password, password);

        if (!isMatch) throw new Error("Invalid credentials");

        return { ...rest, id: _id.toString() };

      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session:{
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
  // pages:{},
};
