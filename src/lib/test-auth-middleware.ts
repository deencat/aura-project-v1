import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Special middleware for test environments
 * This completely bypasses Clerk authentication and allows access to all routes
 * Use this in tests to avoid authentication issues
 */
export const testAuthMiddleware = (req: NextRequest) => {
  // Simply allow access to all routes
  return NextResponse.next();
};

// Helper function to check if we're in a test environment
export const isTestEnvironment = () => {
  return process.env.NODE_ENV === 'test' || process.env.PLAYWRIGHT_TEST === 'true';
}; 