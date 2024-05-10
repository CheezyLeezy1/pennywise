import {NextResponse} from "next/server";
import {BankAuthTokenResponse} from "@/lib/definitions";
import {requestToken} from "@/lib/utils";
import {cookies} from "next/headers";


export async function GET() {
  const response:BankAuthTokenResponse = await requestToken();
  const accessToken = response.access;
  const accessTokenExpiry = response.access_expires; // Assuming these properties exist
  const refreshToken = response.refresh;
  const refreshTokenExpiry = response.refresh_expires;

  cookies().set(
     'authToken',
     accessToken,
     {
       path: '/', // Accessible from all paths
       domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
       httpOnly: true, // Prevent client-side JavaScript access
       secure: true, // Only send over HTTPS connections
       sameSite: 'strict', // Mitigate cross-site request forgery (CSRF) attacks
       maxAge: accessTokenExpiry, // Expires after access token expiry
     }
  );

  cookies().set(
     'authRefreshToken',
     refreshToken,
     {
       path: '/api/auth/refresh', // Only accessible for refresh route (optional)
       httpOnly: true,
       secure: true,
       sameSite: 'strict',
       maxAge: refreshTokenExpiry, // Expires after refresh token expiry
     }
  );
  return NextResponse.json({ message: accessToken }, { status: 200 });
}
