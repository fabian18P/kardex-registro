// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/auth/login', '/favicon.ico', '/_next']; // ajusta si cambias rutas

const ROLE_TO_REGEX: Record<string, RegExp> = {
  admin: /^\/(dashboard)\/admin(\/|$)/,
  operario: /^\/(dashboard)\/operario(\/|$)/,
  visitante: /^\/(dashboard)\/visitante(\/|$)/,
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // público
  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // solo protegemos dashboard
  const isDashboard = pathname.startsWith('/dashboard');
  if (!isDashboard) return NextResponse.next();

  const token = req.cookies.get('token')?.value;
  const role  = req.cookies.get('role')?.value as keyof typeof ROLE_TO_REGEX | undefined;

  if (!token || !role) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // autorización por rol
  if (!ROLE_TO_REGEX[role]?.test(pathname)) {
    // si no tiene permiso, llévalo a su home
    return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
};