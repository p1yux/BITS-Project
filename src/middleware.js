import { NextResponse } from 'next/server';

export function middleware(request) {
  // Protected routes that require authentication
  const protectedRoutes = ['/admin'];
  
  // Check if the requested path is protected
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    // Only redirect admin routes to home page if not authenticated
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 