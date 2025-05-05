import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { isTestEnvironment, testAuthMiddleware } from './lib/test-auth-middleware';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

// Define public paths that don't require authentication
const publicPaths = [
  '/',
  '/about',
  '/contact',
  '/sign-in',
  '/sign-up',
  /^\/treatments/,
  /^\/new-doublo/,
  /^\/body-care/,
  /^\/cell-beauty/,
  /^\/_next\//,
  /^\/api\//,
  /^\/images\//,
  /^\/fonts\//,
];

// Create route matchers using Clerk's helper
const isPublicRoute = createRouteMatcher(publicPaths);

// Check if URL has outdated path pattern
const isLegacyPath = (path: string) => {
  // Currently we're handling the cell-beauty to body-care redirect
  return path.startsWith('/cell-beauty');
};

// Get the new URL with updated path pattern
const getUpdatedPath = (path: string) => {
  // Replace cell-beauty with body-care
  if (path.startsWith('/cell-beauty')) {
    return path.replace('/cell-beauty', '/body-care');
  }
  return path;
};

// Split the middleware based on environment
// For test environments, use a simple bypass middleware
// For non-test environments, use Clerk's middleware
const handler = isTestEnvironment() 
  ? (req: NextRequest) => {
      // Handle redirects for outdated URL patterns
      const url = req.nextUrl.clone();
      const path = url.pathname;
      
      if (isLegacyPath(path)) {
        const newPath = getUpdatedPath(path);
        url.pathname = newPath;
        return NextResponse.redirect(url);
      }
      
      // Otherwise use the test auth middleware
      return testAuthMiddleware(req);
    }
  : clerkMiddleware(
      async (auth, req) => {
        // Handle redirects for outdated URL patterns
        const url = req.nextUrl.clone();
        const path = url.pathname;
        
        if (isLegacyPath(path)) {
          const newPath = getUpdatedPath(path);
          url.pathname = newPath;
          return NextResponse.redirect(url);
        }
        
        // Allow access to public paths
        if (isPublicRoute(req)) {
          return NextResponse.next();
        }
        
        // For protected routes, use Clerk's auth.protect()
        await auth.protect();
        return NextResponse.next();
      },
      { debug: process.env.NODE_ENV === 'development' }
    );

export default handler;

// Configure the middleware matcher
export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ],
};