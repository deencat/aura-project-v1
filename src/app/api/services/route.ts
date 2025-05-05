import { NextResponse } from 'next/server';
import { getAllServices } from '@/lib/db';

// GET handler for fetching all services
export async function GET() {
  try {
    // Use the database function to get all services
    const services = await getAllServices();
    
    // Return the services data
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
} 