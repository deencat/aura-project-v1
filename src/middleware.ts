import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook/clerk',
  '/about',
  '/contact',
  '/service',
  '/body-care',
  '/body-care/(.*)',
  '/facial',
  '/treatments',
  '/treatments/(.*)',
  // Images and static files
  '/images/(.*)',
  '/_next/static/(.*)',
  '/_next/image(.*)',
  '/favicon.ico'
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};