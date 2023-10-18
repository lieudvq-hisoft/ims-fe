import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userService from "@/services/user";
import moment from "moment";
import { decodeJwt } from "@/utils/decode-jwt";
import { JwtPayload } from "jsonwebtoken";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "cusCredentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
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
            expires_in: result.expires_in, //60s as swagger show
            loginDate: moment().format(),
            userID: result.userID,
            userName: result.userName,
            token_type: result.token_type,
            role: "",
          } as User;
          let exp: number | undefined;
          let decode: JwtPayload | string | undefined;
          let role: string | undefined;

          if (result && typeof result === "object" && result.access_token) {
            const decodedToken = decodeJwt(result.access_token);
            if (decodedToken) {
              decode = decodedToken;
              if (typeof decode === "object") {
                exp = decode[
                  "exp"
                ] as number | undefined;
                if (exp) {
                  user.expires_in = exp;
                }

                role = decode[
                  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ] as string | undefined;
                if (role) {
                  user.role = role;
                }
              }
            }
          }
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
        token.role = user.role;
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
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST}