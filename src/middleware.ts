import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { isExpiredTimeToken } from "@/utils/token-exp-checker";
import { signOut } from "next-auth/react";
import { decodeJwt } from "@/utils/decode-jwt";
import { JwtPayload } from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as any;

  let role: string | undefined;
  let decode: JwtPayload | string | undefined;
  let exp: number | undefined;

  if (token && typeof token === "object" && token.access_token) {
    const decodedToken = decodeJwt(token.access_token);
    if (decodedToken) {
      decode = decodedToken;
      if (typeof decode === "object") {
        role = decode[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] as string | undefined;
        exp = decode["exp"] as number | undefined;
      }
    }
  }
  // const role = decodeJwt(token.access_token); //code của Hạ, đang lỗi nên dùng chatGPT nó chỉ đoạn code trên
  // console.log(role['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
  switch (pathname) {
    case "/":
      //có token, chưa hết hạn login => so role (demo 2 role: admin + sales-staff)
      if (role && isExpiredTimeToken(token.loginDate, exp!)) {
        if (role === "Admin") {
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}/admin/accounts`
          );
        } else if (role === "Sale") {
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}/sales/customers`
          );
        } else if (role === "Tech") {
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}/technical/maps`
          );
        }
        //ko có token hoặc hết hạn login
        if (!token) {
          return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
        } else if (!isExpiredTimeToken(token.loginDate, exp!)) {
          return signOut({ redirect: true, callbackUrl: "/" });
        }
      }
      break;
    case "/home":
      if (!token || !isExpiredTimeToken(token.loginDate, exp!)) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
      }
      break;
    case "/sales/customers":
    case "/sales/tickets":
      if (
        !token ||
        !isExpiredTimeToken(token.loginDate, exp!) ||
        role !== "Sale"
      ) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
      }
      break;
    case "/admin/accounts":
      if (
        !token ||
        !isExpiredTimeToken(token.loginDate, exp!) ||
        role !== "Admin"
      ) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
      }
      break;
    case "/technical/maps":
    case "/technical/requests":
      if (
        !token ||
        !isExpiredTimeToken(token.loginDate, exp!) ||
        role !== "Tech"
      ) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
      }
      break;
  }
}
