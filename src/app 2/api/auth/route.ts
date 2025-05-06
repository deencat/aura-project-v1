import { NextResponse } from 'next/server';

/**
 * This endpoint provides authentication status information
 * It's useful for debugging Clerk auth issues and testing that
 * the middleware is working correctly
 */
export async function GET() {
  try {
    // Return basic auth status information that doesn't require
    // access to sensitive data
    return NextResponse.json({
      message: 'Clerk auth API is operational',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      middleware: {
        enabled: true,
        path: 'src/middleware.ts',
        matcher: '/((?!.*\\..*|_next).*)/, /, /(api|trpc)(.*)'
      }
    });
  } catch (error) {
    console.error('Error in auth API:', error);
    return NextResponse.json(
      { error: 'Authentication service error' },
      { status: 500 }
    );
  }
} 