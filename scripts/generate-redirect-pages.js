#!/usr/bin/env node

/**
 * Script to generate redirect pages for legacy cell-beauty paths
 * This creates React components with client-side redirects for each cell-beauty path
 * that should redirect to the corresponding body-care path.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Base paths
const SOURCE_DIR = path.join(process.cwd(), 'src/app/body-care');
const TARGET_DIR = path.join(process.cwd(), 'src/app/cell-beauty');

// Template for redirect pages
const redirectTemplate = (targetPath) => `'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'

/**
 * Legacy page - automatically redirects to ${targetPath}
 * This page should not normally be visible as middleware should handle the redirect,
 * but this provides a fallback in case middleware fails or direct URL access occurs
 */
export default function LegacyRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new URL path
    router.push('${targetPath}')
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600">Redirecting to the new page...</p>
    </div>
  )
}`;

// Get all directories in the body-care folder
const subDirectories = fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${subDirectories.length} subdirectories in body-care:`);
console.log(subDirectories);

// Create redirect pages for each subdirectory
subDirectories.forEach(dir => {
  const targetDir = path.join(TARGET_DIR, dir);
  const targetFile = path.join(targetDir, 'page.tsx');
  const redirectPath = `/body-care/${dir}`;
  
  console.log(`Creating redirect for ${dir} -> ${redirectPath}`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`  - Created directory ${targetDir}`);
  }
  
  // Create page file with redirect
  fs.writeFileSync(targetFile, redirectTemplate(redirectPath));
  console.log(`  - Created file ${targetFile}`);
});

console.log('\nAll redirect pages created successfully!');
console.log('Note: Middleware.ts must also be configured to handle these redirects'); 