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
  [key: string]: any;
}

// In-memory storage for server-side rendering
let inMemoryServices: StoredService[] = [];
let isInitialized = false;

/**
 * Initialize the service storage with default data
 */
export function initializeServiceStorage(): StoredService[] {
  // Skip if already initialized
  if (isInitialized) return getServices();
  
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Client-side: Check if we have data in localStorage
    const storedServices = localStorage.getItem('adminServices');
    if (!storedServices) {
      // Initialize localStorage with mock data
      localStorage.setItem('adminServices', JSON.stringify(mockServices));
    }
  } else {
    // Server-side: Initialize in-memory storage with mock data
    inMemoryServices = [...mockServices];
  }
  
  isInitialized = true;
  return getServices();
}

/**
 * Get all services
 */
export function getServices(): StoredService[] {
  if (!isInitialized) {
    return initializeServiceStorage();
  }
  
  if (typeof window !== 'undefined') {
    // Client-side: Get from localStorage
    const storedServices = localStorage.getItem('adminServices');
    return storedServices ? JSON.parse(storedServices) : [];
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
  return services.find(service => service.id === id) || null;
}

/**
 * Get a service by slug
 */
export function getServiceBySlug(slug: string): StoredService | null {
  const services = getServices();
  return services.find(service => service.slug === slug) || null;
}

/**
 * Save a service
 */
export function saveService(service: StoredService): StoredService {
  const services = getServices();
  const index = services.findIndex(s => s.id === service.id);
  
  if (index !== -1) {
    // Update existing service
    services[index] = {...services[index], ...service};
  } else {
    // Add new service
    services.push(service);
  }
  
  // Save back to storage
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminServices', JSON.stringify(services));
  } else {
    inMemoryServices = services;
  }
  
  return service;
}

/**
 * Delete a service
 */
export function deleteService(id: number): boolean {
  const services = getServices();
  const index = services.findIndex(s => s.id === id);
  
  if (index !== -1) {
    services.splice(index, 1);
    
    // Save back to storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminServices', JSON.stringify(services));
    } else {
      inMemoryServices = services;
    }
    
    return true;
  }
  
  return false;
} 