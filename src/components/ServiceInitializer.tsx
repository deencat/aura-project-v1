'use client';

import { useEffect } from 'react';
import { initializeServiceStorage } from '@/utils/serviceStorage';

/**
 * This component initializes the service storage on the client side.
 * It should be included in the app's layout.
 */
export default function ServiceInitializer() {
  useEffect(() => {
    // Initialize service storage
    const init = async () => {
      try {
        await initializeServiceStorage();
        console.log('Service storage initialized');
      } catch (error) {
        console.error('Failed to initialize service storage:', error);
      }
    };
    
    init();
  }, []);

  // This component doesn't render anything
  return null;
} 