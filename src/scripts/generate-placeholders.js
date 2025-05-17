/**
 * Script to generate consistent placeholder images for all treatment categories and types
 * 
 * Usage: node src/scripts/generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');

// Define categories and image types
const CATEGORIES = ['new-doublo', 'body-care', 'facials'];

const IMAGE_TYPES = [
  'hero',
  'how-it-works',
  'benefits',
  'results',
  'testimonial',
  'gallery',
  'technology',
  'comparison',
  'before-after'
];

// Base directory for placeholder images
const PLACEHOLDER_DIR = path.join(process.cwd(), 'public', 'images', 'placeholders');

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Function to create a placeholder file if it doesn't exist
function createPlaceholderIfNeeded(category, type) {
  const categoryDir = path.join(PLACEHOLDER_DIR, category);
  ensureDirectoryExists(categoryDir);
  
  const placeholderPath = path.join(categoryDir, `${type}.jpg`);
  
  // Skip if file already exists
  if (fs.existsSync(placeholderPath)) {
    console.log(`Placeholder already exists: ${placeholderPath}`);
    return;
  }
  
  // Create a minimal placeholder file
  // In a real implementation, we would generate an actual image
  // For now, we'll just create a text file with instructions
  const placeholderContent = `This is a placeholder for ${category}/${type}. 
Replace with an actual image of appropriate dimensions.`;
  
  fs.writeFileSync(placeholderPath, placeholderContent);
  console.log(`Created placeholder: ${placeholderPath}`);
}

// Main function
function generatePlaceholders() {
  console.log('Generating placeholder images...');
  
  // Ensure base directory exists
  ensureDirectoryExists(PLACEHOLDER_DIR);
  
  // Generate placeholders for each category and type
  CATEGORIES.forEach(category => {
    IMAGE_TYPES.forEach(type => {
      createPlaceholderIfNeeded(category, type);
    });
  });
  
  console.log('Placeholder generation complete!');
}

// Run the script
generatePlaceholders(); 