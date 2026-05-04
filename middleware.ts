import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest} from "next/server";

const intlMiddleware = createMiddleware(routing);

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

export default function middleware(request: NextRequest) {
    /*const { pathname } = request.nextUrl;
    const token = request.cookies.get("_token")
    if (pathname.includes('/dashboard') || pathname.includes('/profile')) {
        if (!token) {
            return Response.redirect(new URL('/login', request.url));
        }
    } else if (pathname.includes('/login') || pathname.includes('/register')) {
        if (token) {
            return Response.redirect(new URL('/dashboard', request.url));
        }
    }*/
    return intlMiddleware(request);
}