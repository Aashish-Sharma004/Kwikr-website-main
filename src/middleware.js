import { NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register'];
const AUTH_ENABLED = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Agar auth OFF hai (live mode) aur koi login/register kholne ki koshish kare
  // to use home page pe bhej do
  if (!AUTH_ENABLED && PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Auth OFF hai to baaki sab kuch normally chalne do
  if (!AUTH_ENABLED) {
    return NextResponse.next();
  }

  const isPublic =
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.');

  if (isPublic) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get('authToken')?.value;

  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};



// import { NextResponse } from 'next/server';

// // Routes that DON'T require login
// const PUBLIC_PATHS = ['/login', '/register'];

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // Let public pages, Next.js internals, and static assets through
//   const isPublic =
//     PUBLIC_PATHS.includes(pathname) ||
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api') ||
//     pathname.includes('.'); // files like favicon.ico, images, etc.

//   if (isPublic) {
//     return NextResponse.next();
//   }

//   const authToken = request.cookies.get('authToken')?.value;

//   if (!authToken) {
//     const loginUrl = new URL('/login', request.url);
//     // remember where the user was trying to go, so we can send them back after login
//     loginUrl.searchParams.set('redirect', pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// // Apply to all routes except static files handled above
// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// };
