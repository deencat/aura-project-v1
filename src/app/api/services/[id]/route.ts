import { NextResponse } from 'next/server';
import { mockServices } from '@/app/admin/services/mockData';

// GET handler for fetching a single service by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Find the service with the matching ID
    const service = mockServices.find(service => service.id === id);
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Return the service data
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT handler for updating a service
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const updatedData = await request.json();
    
    // Find the index of the service with the matching ID
    const serviceIndex = mockServices.findIndex(service => service.id === id);
    
    if (serviceIndex === -1) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // In a real implementation, this would update the service in the database
    // For now, we'll just return the updated service data
    // (Note: This won't actually persist changes since we're using mock data)
    const updatedService = {
      ...mockServices[serviceIndex],
      ...updatedData,
      id // Ensure ID remains the same
    };
    
    // Return the updated service
    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE handler for deleting a service
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Find the index of the service with the matching ID
    const serviceIndex = mockServices.findIndex(service => service.id === id);
    
    if (serviceIndex === -1) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // In a real implementation, this would delete the service from the database
    // For now, we'll just return success
    // (Note: This won't actually persist changes since we're using mock data)
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
} 