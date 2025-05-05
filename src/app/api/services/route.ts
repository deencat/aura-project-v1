import { NextResponse } from 'next/server';
import { mockServices } from '@/app/admin/services/mockData';

// GET handler for fetching all services
export async function GET() {
  try {
    // In a real implementation, this would fetch from a database
    // For now, we're using our mock data
    
    // Return the mock services data
    return NextResponse.json(mockServices, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
} 