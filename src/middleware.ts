import { authMiddleware } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

// Define the public paths that don't require authentication
const publicPaths = [
  '/',
  '/about',
  '/contact',
  '/treatments',
  '/facials',
  '/new-doublo/(.*)', // All new-doublo pages
  '/facial-treatments/(.*)', // All facial treatments
  '/body-care/(.*)', // All body care pages
  '/api/(.*)', // API routes
  '/sitemap.xml', // SEO files
  '/robots.txt',
  '/favicon.ico',
];

// Test environment detection
const isTestEnvironment = process.env.PLAYWRIGHT_TEST === 'true';

// Special middleware for test environments - bypass authentication
function testMiddleware() {
  return (request: NextRequest) => {
    return NextResponse.next();
  };
}

// Use the actual authMiddleware from Clerk, but only in non-test environments
export default isTestEnvironment 
  ? testMiddleware() 
  : authMiddleware({
      publicRoutes: publicPaths
    });

// Configure exported matcher to catch all routes
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};