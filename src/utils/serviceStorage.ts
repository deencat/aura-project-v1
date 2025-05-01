/**
 * Service Storage Utility
 * 
 * This file provides functions for storing and retrieving service data
 * in a way that works in both client and server environments.
 */

import { mockServices } from '@/app/admin/services/mockData';

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

// In-memory storage for server-side rendering
let inMemoryServices: StoredService[] = [];
let isInitialized = false;

// Constants
const STORAGE_KEY = 'adminServices';
const BACKUP_STORAGE_KEY = 'adminServicesBackup';
const STORAGE_VERSION_KEY = 'adminServicesVersion';
const DEBUG_MODE = process.env.NODE_ENV === 'development';

/**
 * Debug logging helper - only logs in development mode
 */
function logDebug(message: string, data?: any): void {
  if (!DEBUG_MODE) return;
  
  if (data) {
    console.log(`🔍 [ServiceStorage] ${message}`, data);
  } else {
    console.log(`🔍 [ServiceStorage] ${message}`);
  }
}

/**
 * Initialize the service storage with default data
 */
export function initializeServiceStorage(): StoredService[] {
  // Skip if already initialized
  if (isInitialized) {
    logDebug('Storage already initialized, skipping');
    return getServices();
  }
  
  logDebug('Initializing service storage');
  
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    try {
      // Client-side: Check if we have data in localStorage
      const storedServices = localStorage.getItem(STORAGE_KEY);
      const backupServices = sessionStorage.getItem(BACKUP_STORAGE_KEY);
      
      if (storedServices) {
        logDebug('Found existing services in localStorage');
        
        // Make sure we have a backup in sessionStorage
        if (!backupServices) {
          sessionStorage.setItem(BACKUP_STORAGE_KEY, storedServices);
          logDebug('Created backup in sessionStorage');
        }
      } else if (backupServices) {
        // Restore from backup if available
        localStorage.setItem(STORAGE_KEY, backupServices);
        logDebug('Restored services from sessionStorage backup');
      } else {
        // Initialize localStorage with mock data with timestamps and versions
        const enhancedMockServices = mockServices.map(service => ({
          ...service,
          last_updated: Date.now(),
          version: 1
        }));
        
        const servicesJson = JSON.stringify(enhancedMockServices);
        localStorage.setItem(STORAGE_KEY, servicesJson);
        sessionStorage.setItem(BACKUP_STORAGE_KEY, servicesJson);
        localStorage.setItem(STORAGE_VERSION_KEY, '1');
        
        logDebug('Initialized storage with mock data', enhancedMockServices);
      }
      
      // Setup storage change listener for cross-tab synchronization
      window.addEventListener('storage', handleStorageChange);
    } catch (error) {
      logDebug('Error initializing localStorage', error);
      console.error('Error initializing service storage:', error);
    }
  } else {
    // Server-side: Initialize in-memory storage with mock data
    inMemoryServices = [...mockServices].map(service => ({
      ...service,
      last_updated: Date.now(),
      version: 1
    }));
    logDebug('Initialized in-memory storage for server environment');
  }
  
  isInitialized = true;
  return getServices();
}

/**
 * Handle storage changes from other tabs/windows
 */
function handleStorageChange(event: StorageEvent): void {
  if (event.key === STORAGE_KEY && event.newValue) {
    logDebug('Storage updated in another tab, syncing');
    // Update the backup in this tab as well
    sessionStorage.setItem(BACKUP_STORAGE_KEY, event.newValue);
  }
}

/**
 * Get all services
 */
export function getServices(): StoredService[] {
  if (!isInitialized) {
    return initializeServiceStorage();
  }
  
  if (typeof window !== 'undefined') {
    try {
      // Client-side: Get from localStorage
      const storedServices = localStorage.getItem(STORAGE_KEY);
      
      if (storedServices) {
        const services = JSON.parse(storedServices);
        logDebug(`Retrieved ${services.length} services from storage`);
        return services;
      }
      
      // Try to recover from backup if localStorage is empty
      const backupServices = sessionStorage.getItem(BACKUP_STORAGE_KEY);
      if (backupServices) {
        const services = JSON.parse(backupServices);
        // Restore the main storage from backup
        localStorage.setItem(STORAGE_KEY, backupServices);
        logDebug(`Recovered ${services.length} services from backup`);
        return services;
      }
      
      logDebug('No services found in storage');
      return [];
    } catch (error) {
      logDebug('Error retrieving services', error);
      console.error('Error retrieving services:', error);
      return [];
    }
  } else {
    // Server-side: Get from in-memory storage
    return inMemoryServices;
  }
}

/**
 * Get a service by ID
 */
export function getServiceById(id: number): StoredService | null {
  const services = getServices();
  const service = services.find(service => service.id === id);
  
  if (service) {
    logDebug(`Found service with ID ${id}`, service);
  } else {
    logDebug(`Service with ID ${id} not found`);
  }
  
  return service || null;
}

/**
 * Get a service by slug
 */
export function getServiceBySlug(slug: string): StoredService | null {
  const services = getServices();
  const service = services.find(service => service.slug === slug);
  
  if (service) {
    logDebug(`Found service with slug ${slug}`, service);
  } else {
    logDebug(`Service with slug ${slug} not found`);
  }
  
  return service || null;
}

/**
 * Save a service
 */
export function saveService(service: StoredService): StoredService {
  logDebug(`Saving service with ID ${service.id}`, service);
  
  // Add metadata for tracking changes
  const serviceWithMetadata = {
    ...service,
    last_updated: Date.now(),
    version: (service.version || 0) + 1
  };
  
  const services = getServices();
  const index = services.findIndex(s => s.id === service.id);
  
  if (index !== -1) {
    // Update existing service
    services[index] = {
      ...services[index],
      ...serviceWithMetadata
    };
    logDebug(`Updated existing service at index ${index}`);
  } else {
    // Add new service
    services.push(serviceWithMetadata);
    logDebug('Added new service');
  }
  
  try {
    // Save back to storage
    if (typeof window !== 'undefined') {
      const servicesJson = JSON.stringify(services);
      localStorage.setItem(STORAGE_KEY, servicesJson);
      sessionStorage.setItem(BACKUP_STORAGE_KEY, servicesJson);
      
      // Update version
      const currentVersion = parseInt(localStorage.getItem(STORAGE_VERSION_KEY) || '1');
      localStorage.setItem(STORAGE_VERSION_KEY, (currentVersion + 1).toString());
      
      logDebug('Services saved to storage');
      
      // Dispatch storage event to notify other tabs
      window.dispatchEvent(new StorageEvent('storage', {
        key: STORAGE_KEY,
        newValue: servicesJson
      }));
    } else {
      inMemoryServices = services;
      logDebug('Services saved to in-memory storage');
    }
  } catch (error) {
    logDebug('Error saving service', error);
    console.error('Error saving service:', error);
  }
  
  return serviceWithMetadata;
}

/**
 * Delete a service
 */
export function deleteService(id: number): boolean {
  logDebug(`Deleting service with ID ${id}`);
  
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  
  if (index !== -1) {
    services.splice(index, 1);
    logDebug(`Service removed at index ${index}`);
    
    try {
      // Save back to storage
      if (typeof window !== 'undefined') {
        const servicesJson = JSON.stringify(services);
        localStorage.setItem(STORAGE_KEY, servicesJson);
        sessionStorage.setItem(BACKUP_STORAGE_KEY, servicesJson);
        
        // Update version
        const currentVersion = parseInt(localStorage.getItem(STORAGE_VERSION_KEY) || '1');
        localStorage.setItem(STORAGE_VERSION_KEY, (currentVersion + 1).toString());
        
        logDebug('Updated services saved after deletion');
      } else {
        inMemoryServices = services;
        logDebug('Updated in-memory services after deletion');
      }
    } catch (error) {
      logDebug('Error deleting service', error);
      console.error('Error deleting service:', error);
      return false;
    }
    
    return true;
  }
  
  logDebug(`Service with ID ${id} not found for deletion`);
  return false;
} 