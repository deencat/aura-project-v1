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
  /^\/_next\//,
  /^\/api\//,
  /^\/images\//,
  /^\/fonts\//,
];

// Create route matchers using Clerk's helper
const isPublicRoute = createRouteMatcher(publicPaths);

// Split the middleware based on environment
// For test environments, use a simple bypass middleware
// For non-test environments, use Clerk's middleware
const handler = isTestEnvironment() 
  ? testAuthMiddleware
  : clerkMiddleware(async (auth, req) => {
      // Allow access to public paths
      if (isPublicRoute(req)) {
        return NextResponse.next();
      }
      
      // For protected routes, use Clerk's auth.protect()
      await auth.protect();
      return NextResponse.next();
    });

export default handler;

// Configure the middleware matcher
export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ],
};