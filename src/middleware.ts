import { authMiddleware } from '@clerk/nextjs/server';

// Using authMiddleware instead of clerkMiddleware since your Clerk version uses this API
export default authMiddleware({
  // Add all public routes
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/api/webhook/clerk',
    '/about',
    '/contact',
    '/service',
    '/body-care',
    '/facial',
    // Add specific image routes that were being blocked based on logs
    '/images/placeholders/treatment-1.jpg',
    '/images/placeholders/treatment-2.jpg',
    '/images/placeholders/treatment-3.jpg',
    '/logo.svg',
    // Wildcard routes for images
    '/images/(.*)',
    // Static files pattern
    '/_next/static/(.*)',
    '/_next/image(.*)',
    '/favicon.ico'
  ],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};