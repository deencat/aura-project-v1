/**
 * Service Storage Utility
 * 
 * This file provides functions for storing and retrieving service data
 * in a way that works in both client and server environments.
 */

// Type definitions
interface StoredService {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: string;
  duration: string;
  status: string;
  short_description: string;
  long_description: string;
  benefits: string;
  suitable_for: string;
  contraindications: string;
  preparation: string;
  aftercare: string;
  section_images?: any;
  template?: string;
  last_updated?: number; // Timestamp for when service was last updated
  version?: number; // Version number for tracking changes
  [key: string]: any;
}

/**
 * Initialize the service storage system
 * This should be called once when the app starts on the client side
 */
export async function initializeServiceStorage() {
  try {
    // Fetch initial services data
    const services = await getServices();
    
    // Store in memory cache
    localStorage.setItem('services', JSON.stringify(services));
    localStorage.setItem('lastUpdated', Date.now().toString());
    
    return true;
  } catch (error) {
    console.error('Failed to initialize service storage:', error);
    return false;
  }
}

/**
 * Fetch all services from backend API
 */
export async function getServices(): Promise<StoredService[]> {
  const res = await fetch('/api/services');
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

/**
 * Fetch a single service by ID
 */
export async function getServiceById(id: number): Promise<StoredService> {
  const res = await fetch(`/api/services/${id}`);
  if (!res.ok) throw new Error('Failed to fetch service');
  return res.json();
}

/**
 * Create a new service
 */
export async function createService(service: Partial<StoredService>): Promise<StoredService> {
  const res = await fetch('/api/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!res.ok) throw new Error('Failed to create service');
  return res.json();
}

/**
 * Update an existing service
 */
export async function updateService(id: number, service: Partial<StoredService>): Promise<StoredService> {
  const res = await fetch(`/api/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!res.ok) throw new Error('Failed to update service');
  return res.json();
}

/**
 * Delete a service
 */
export async function deleteService(id: number): Promise<void> {
  const res = await fetch(`/api/services/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete service');
} 