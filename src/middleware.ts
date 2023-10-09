import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { isExpiredTimeToken } from "@/utils/token-exp-checker";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as any;
  switch (pathname) {
    case "/":
      //có token, chưa hết hạn login => so role (demo 2 role: admin + sales-staff)
      if (token && !isExpiredTimeToken(token.loginDate, token.expiresIn)) {
        if (token.userName === "admin") {
          return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/accounts`);
        } else if (token.userName === "staff") {
          return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/sales/customers`);
        }
        break;
        //ko có token hoặc hết hạn login
      } else if (!token || isExpiredTimeToken(token.loginDate, token.expiresIn)) {
        return NextResponse.redirect(`${origin}`);
      }
    case "/sales/customers":
    case "/sales/tickets":
      if (!token || isExpiredTimeToken(token.loginDate, token.expiresIn) || token.userName !== "staff") {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
      } else {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}${pathname}`);
      }
  }
}