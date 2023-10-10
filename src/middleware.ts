import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { isExpiredTimeToken } from "@/utils/token-exp-checker";
import { decodeJwt } from "@/utils/decode-jwt";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as any;

  let role, decode;
  if (token && typeof token === 'object' && token.access_token) {
    decode = decodeJwt(token.access_token);
    role = decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
  // const role = decodeJwt(token.access_token); //code của Hạ, đang lỗi nên dùng chatGPT nó chỉ đoạn code trên
  // console.log(role['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
  switch (pathname) {
    case "/":
      //có token, chưa hết hạn login => so role (demo 2 role: admin + sales-staff)
      if (role && isExpiredTimeToken(token.loginDate, token.expires_in)) {
        if (role === "Admin") {
          return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/admin/accounts`);
        } else if (role === "Sale") {
          return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/sales/customers`);
        } else if (role === "IT") {
          return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/technical/map`);
        }
        //ko có token hoặc hết hạn login
      if (!token) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
      }
      }
      break;
    case "/sales/customers":
    case "/sales/tickets":
      if (!token || !isExpiredTimeToken(token.loginDate, token.expires_in) || role !== "Sale") {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
      }
      break;
    case "/admin/accounts":
      if (!token || !isExpiredTimeToken(token.loginDate, token.expires_in) || role !== "Admin") {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
      }
      break;
  }
}