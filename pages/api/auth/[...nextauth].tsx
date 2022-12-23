import NextAuth, { NextAuthOptions } from "next-auth";
import User from "../../../models/User";
import db from "../../../utils/db";
import CredentialsProvider from "next-auth/providers/credentials";

var bcrypt = require("bcryptjs");

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: "f",
            isAdmin: user.isAdmin,
          } as any;
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token._id = user._id;
      return token;
    },
    async session({ session, token }: any) {
      if (token?._id) session.user._id = token._id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
