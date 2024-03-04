import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/login', '/register'];
const protectedRoutes = ['/dashboard', '/account', '/create-review', '/review'];

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access-token');
  const pathname = req.nextUrl.pathname;

  if (!accessToken && (protectedRoutes.includes(pathname) || pathname.startsWith('/review'))) {
    return NextResponse.redirect(new URL(`/login?redirectTo=${req.nextUrl.pathname}`, req.url));
  }

  if (accessToken && (publicRoutes.includes(pathname) || pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}
