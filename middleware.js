import {NextResponse} from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log('MIDDLEWARE', request.nextUrl.pathname);
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!static|api|_next|favicon\\.ico).*)',
  ],
};
