// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value;

  if (!isAuthenticated || isAuthenticated !== 'true') {
    // Redirigir a la página de login si no está autenticado
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Permitir acceso si está autenticado
  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/dashboard', '/profile', '/devices', '/calls'], // Agrega las rutas que deseas proteger
};
