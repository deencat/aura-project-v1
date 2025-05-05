import { NextResponse } from 'next/server';
import { getServiceById, updateService, deleteService } from '@/lib/db';
import { ServiceUpdateSchema } from '@/lib/validation/service-schema';

// GET handler for fetching a single service by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Get service from database
    const service = await getServiceById(id);
    
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
    const body = await request.json();
    
    // Validate the input data
    const validationResult = ServiceUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Return validation errors
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }
    
    // Check if service exists
    const existingService = await getServiceById(id);
    
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Update service in database
    const updatedService = await updateService(id, validationResult.data);
    
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
    
    // Check if service exists
    const existingService = await getServiceById(id);
    
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Delete service from database
    await deleteService(id);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
} 