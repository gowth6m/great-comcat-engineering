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
  pages: {
    signIn: "/login",
    error: "/auth/error",
    signOut: "/auth/signout",
  },
};

export default NextAuth(authOptions);

// export default NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user?.id) token.id = user.id;
//       if (user?.isAdmin) token.isAdmin = user.isAdmin;
//       return token;
//     },
//     async session({ session, token }) {
//       if (token?._id) session.user._id = token._id;
//       if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
//       return session;
//     },
//   },
//     providers: [
//         CredentialsProvider({
//             async authorize(credentials:any) {
//                 await user = await User.findOne({
//                     email: credentials.email,
//                 });
//                 await db.disconnect();
//                 if (user && bcryptjs.compareSync(credentials.password, user.password)) {
//                     return {
//                         _id: user._id,
//                         name: user.name,
//                         email: user.email,
//                         image: "f",
//                         isAdmin: user.isAdmin,
//                     };
//                 }
//             }
//         })
//     ],
// });
