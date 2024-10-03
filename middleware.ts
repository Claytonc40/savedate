import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/admin', '/profile'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });
  const { pathname } = req.nextUrl;

  // Verifica se o usuário está tentando acessar uma rota de autenticação e já está logado
  if (token && pathname.includes('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', req.url)); // Redireciona para o dashboard
  }

  // Protege todas as rotas que contêm '/dashboard'
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth', req.url)); // Redireciona para a página de login
  }

  // Verifica se o usuário não está autenticado e tenta acessar rotas de admin
  if (!token && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth', req.url)); // Redireciona para a página de login
  }

  // Verifica se o usuário está tentando acessar uma rota protegida sem estar logado
  if (!token && PROTECTED_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth', req.url)); // Redireciona para a página de login
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/admin/:path*', '/profile'], // Define os padrões de rota protegidos
};
