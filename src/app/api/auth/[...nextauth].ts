import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userService from "@/services/user";
import moment from "moment";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        var result = await userService.login(
          credentials?.username!,
          credentials?.password!
        );

        if (result) {
          const user = {
            id: result.userID,
            name: result.userName,
            access_token: result.access_token,
            expires_in: result.expires_in,
            loginDate: moment().format(),
            userID: result.userID,
            userName: result.userName,
            token_type: result.token_type,

          } as User;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.expires_in = user.expires_in;
        token.loginDate = user.loginDate;
        // token.email = user.email;
        token.userId = user.userID;
        token.userName = user.userName;
      }
      if (trigger === "update" && session) {
        return { ...token, ...session?.user };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session) {
        session.expires = moment(token.loginDate)
          .add(token.expires_in, "seconds")
          .toDate();
        session.user.access_token = token.access_token;
        // session.user.email = token.email;
        session.user.userName = token.userName;
        session.user.userID = token.userID;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
