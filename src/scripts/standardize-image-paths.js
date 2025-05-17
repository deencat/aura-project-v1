/**
 * Script to standardize image paths across the project
 * 
 * This script:
 * 1. Scans treatment directories to identify all treatments
 * 2. Creates proper directory structure for each treatment
 * 3. Logs missing images that need to be created
 * 
 * Usage: node src/scripts/standardize-image-paths.js
 */

const fs = require('fs');
const path = require('path');

// Constants
const TREATMENTS_APP_DIR = path.join(process.cwd(), 'src', 'app', 'treatments');
const BODY_CARE_APP_DIR = path.join(process.cwd(), 'src', 'app', 'body-care');
const TREATMENTS_IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'treatments');

// Image types that should exist for each treatment
const REQUIRED_IMAGE_TYPES = [
  'hero.jpg',
  'how-it-works-1.jpg',
  'benefits-1.jpg',
  'results-1.jpg'
];

// Optional image types
const OPTIONAL_IMAGE_TYPES = [
  'testimonial-1.jpg',
  'gallery-1.jpg',
  'technology.jpg',
  'comparison.jpg',
  'before-after-1.jpg'
];

// Map treatment directories to their categories
const CATEGORY_MAPPING = {
  'treatments': 'facials',
  'body-care': 'body-care',
  'new-doublo': 'new-doublo'
};

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
    return true;
  }
  return false;
}

// Function to get all treatment directories
function getTreatmentDirectories() {
  const treatments = [];
  
  // Get facial treatments
  if (fs.existsSync(TREATMENTS_APP_DIR)) {
    const facialTreatments = fs.readdirSync(TREATMENTS_APP_DIR)
      .filter(item => {
        const itemPath = path.join(TREATMENTS_APP_DIR, item);
        return fs.statSync(itemPath).isDirectory();
      })
      .map(dir => ({ name: dir, category: 'facials' }));
    
    treatments.push(...facialTreatments);
  }
  
  // Get body care treatments
  if (fs.existsSync(BODY_CARE_APP_DIR)) {
    const bodyCareTreatments = fs.readdirSync(BODY_CARE_APP_DIR)
      .filter(item => {
        const itemPath = path.join(BODY_CARE_APP_DIR, item);
        return fs.statSync(itemPath).isDirectory();
      })
      .map(dir => ({ name: dir, category: 'body-care' }));
    
    treatments.push(...bodyCareTreatments);
  }
  
  return treatments;
}

// Function to check and create treatment image directories
function standardizeTreatmentImageDirectories() {
  const treatments = getTreatmentDirectories();
  console.log(`Found ${treatments.length} treatment directories`);
  
  const missingImages = [];
  
  treatments.forEach(treatment => {
    const { name, category } = treatment;
    
    // Create the treatment image directory if it doesn't exist
    const treatmentImageDir = path.join(TREATMENTS_IMAGES_DIR, category, name);
    const created = ensureDirectoryExists(treatmentImageDir);
    
    if (created) {
      console.log(`Created image directory for ${category}/${name}`);
    } else {
      console.log(`Image directory already exists for ${category}/${name}`);
    }
    
    // Check for required images
    REQUIRED_IMAGE_TYPES.forEach(imageType => {
      const imagePath = path.join(treatmentImageDir, imageType);
      if (!fs.existsSync(imagePath)) {
        missingImages.push(`${category}/${name}/${imageType}`);
      }
    });
  });
  
  // Report missing images
  if (missingImages.length > 0) {
    console.log('\nMissing required images:');
    missingImages.forEach(image => {
      console.log(`- ${image}`);
    });
  } else {
    console.log('\nAll required images are present!');
  }
}

// Main function
function standardizeImagePaths() {
  console.log('Standardizing image paths...');
  
  // Ensure base directories exist
  ensureDirectoryExists(TREATMENTS_IMAGES_DIR);
  ensureDirectoryExists(path.join(TREATMENTS_IMAGES_DIR, 'facials'));
  ensureDirectoryExists(path.join(TREATMENTS_IMAGES_DIR, 'body-care'));
  ensureDirectoryExists(path.join(TREATMENTS_IMAGES_DIR, 'new-doublo'));
  
  // Standardize treatment image directories
  standardizeTreatmentImageDirectories();
  
  console.log('\nImage path standardization complete!');
}

// Run the script
standardizeImagePaths(); 