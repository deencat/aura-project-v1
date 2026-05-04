import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook/clerk',
  '/api/services(.*)',  // Add services API routes as public
  '/api/concierge(.*)', // Public concierge APIs (chat/transcribe/synthesize)
  '/api/knowledge/ingest(.*)', // Secret-protected; allow cron without Clerk
  '/api/knowledge/archive/cron(.*)', // Secret-protected; archive aged T3 staging docs
  '/api/knowledge/rollups/cron(.*)', // Secret-protected; Vercel / external cron
  '/about',
  '/contact',
  '/concierge',
  '/service',
  '/body-care',
  '/body-care/(.*)',
  '/facial',
  '/treatments',
  '/treatments/(.*)',
  '/new-doublo',
  '/new-doublo/(.*)',
  '/testimonials',
  '/blog',
  '/blog/(.*)',
  '/trends',
  '/trends/(.*)',
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
    // Only skip true Next internals. Do NOT skip all *.jpg/*.png paths: missing assets still
    // render the app shell + not-found, and Clerk needs clerkMiddleware() to have run for auth().
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
