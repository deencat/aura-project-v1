import { NextResponse } from 'next/server';
import { mockServices } from '@/app/admin/services/mockData';

export async function POST(request: Request) {
  try {
    const newService = await request.json();
    
    // In a real implementation, this would save to a database
    // For now, we'll just generate a fake ID and return the service
    // (Note: This won't actually persist changes since we're using mock data)
    
    // Find the highest existing ID to generate a new one
    const maxId = mockServices.reduce((max, service) => 
      service.id > max ? service.id : max, 0);
    
    // Create the new service with generated ID
    const serviceWithId = {
      ...newService,
      id: maxId + 1
    };
    
    // Return the new service with status 201 (Created)
    return NextResponse.json(serviceWithId, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
} 