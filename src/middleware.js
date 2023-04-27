import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Information about the session is available in the `session` object
  // console.log(session);

  if (session) {
    // Signed in
    return NextResponse.next();
  } else {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    return NextResponse.redirect(url);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile"],
};
