import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  console.log('Token', token);
  if (!token) {
    return NextResponse.redirect(new URL('/signIn', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
