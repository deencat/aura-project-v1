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
    // Clerk recommended matcher: skip Next internals + static files (unless in search params).
    // This avoids "auth() was called but Clerk can't detect usage of clerkMiddleware()"
    // when Next renders not-found for missing assets/routes.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
};
