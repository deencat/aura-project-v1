import { NextResponse } from 'next/server';
import { getServiceById, saveService } from '@/utils/serviceStorage';
import { purgeImageCache } from '@/utils/imageUtils';

const DEBUG_MODE = process.env.NODE_ENV === 'development';

/**
 * Debug logging helper - only logs in development mode
 */
function logDebug(message: string, data?: any): void {
  if (!DEBUG_MODE) return;
  
  if (data) {
    console.log(`🔌 [API] ${message}`, data);
  } else {
    console.log(`🔌 [API] ${message}`);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get service ID from params
    const id = params.id;
    logDebug(`GET request for service ID: ${id}`);
    
    // Use the serviceStorage utility to get the service by ID
    const service = getServiceById(parseInt(id));
    
    if (service) {
      logDebug(`Found service`, service);
      return NextResponse.json({ service });
    }
    
    // If not found, return 404
    logDebug(`Service with ID ${id} not found`);
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
    
    logDebug(`Updating service ${id}`, body);
    
    // Extract image data for special handling
    const { section_images, category, slug, template } = body;
    
    // Validate key data
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Invalid service ID' },
        { status: 400 }
      );
    }
    
    // Ensure essential fields are present
    if (!body.name || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields (name, category)' },
        { status: 400 }
      );
    }
    
    // Get existing service to merge data properly
    const existingService = getServiceById(parseInt(id));
    
    // Ensure the ID is included and converted to a number
    const serviceData = {
      ...existingService, // Start with existing data
      ...body, // Merge with new data
      id: parseInt(id), // Ensure ID is correct
      // Add metadata for tracking
      updated_at: new Date().toISOString()
    };
    
    // Use the serviceStorage utility to save the service
    const updatedService = saveService(serviceData);
    
    // Purge image cache if we have category and slug
    if (category && slug) {
      const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
      const servicePath = typeof slug === 'string' && slug.includes('/') 
        ? slug.split('/')[1] 
        : slug;
      
      logDebug(`Purging image cache for ${categorySlug}/${servicePath}`);
      purgeImageCache(categorySlug, servicePath);
    }
    
    // Return success with the updated service
    return NextResponse.json({ 
      success: true,
      service: updatedService,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Error in PUT /api/services/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as Error).message },
      { status: 500 }
    );
  }
} 