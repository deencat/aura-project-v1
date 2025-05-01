import { NextResponse } from 'next/server';
import { getServiceById, saveService } from '@/utils/serviceStorage';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get service ID from params
    const id = params.id;
    
    // Use the serviceStorage utility to get the service by ID
    const service = getServiceById(parseInt(id));
    
    if (service) {
      return NextResponse.json({ service });
    }
    
    // If not found, return 404
    return NextResponse.json(
      { error: `Service with ID ${id} not found` },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error in GET /api/services/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get service ID from params
    const id = params.id;
    
    // Get request body
    const body = await request.json();
    
    console.log(`Updating service ${id} with:`, body);
    
    // Ensure the ID is included and converted to a number
    const serviceData = {
      ...body,
      id: parseInt(id)
    };
    
    // Use the serviceStorage utility to save the service
    const updatedService = saveService(serviceData);
    
    return NextResponse.json({ 
      success: true,
      service: updatedService
    });
  } catch (error) {
    console.error('Error in PUT /api/services/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 