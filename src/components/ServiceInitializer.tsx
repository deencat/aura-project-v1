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
    initializeServiceStorage();
    console.log('Service storage initialized');
  }, []);

  // This component doesn't render anything
  return null;
} 