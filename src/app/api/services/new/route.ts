import { NextResponse } from 'next/server';
import { createService } from '@/lib/db';
import { ServiceSchema } from '@/lib/validation/service-schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the input data
    const validationResult = ServiceSchema.safeParse(body);
    
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
    
    // Create new service in database
    const createdService = await createService(validationResult.data);
    
    // Return the new service with status 201 (Created)
    return NextResponse.json(createdService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
} 