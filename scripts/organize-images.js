const fs = require('fs');
const path = require('path');

// Define image mappings - old path to new path
const imageMap = {
  // New Doublo images
  '/images/backgrounds/new-doublo-hero.jpg': '/images/treatments/new-doublo/hero.jpg',
  '/images/backgrounds/new-doublo-hero-1.jpg': '/images/treatments/new-doublo/v-line/hero.jpg',
  '/images/backgrounds/new-doublo-hero-3.jpg': '/images/treatments/new-doublo/sculpt-lift/hero.jpg',
  
  // Add more mappings as needed
};

// Directory structure to create
const directories = [
  '/images/treatments/new-doublo',
  '/images/treatments/new-doublo/v-line',
  '/images/treatments/new-doublo/sculpt-lift',
  '/images/treatments/new-doublo/youth-revival',
  '/images/treatments/new-doublo/neck-rejuvenation',
  '/images/treatments/body-care',
  '/images/treatments/body-care/lymphatic-detox',
  '/images/treatments/body-care/stretch-mark',
  '/images/treatments/body-care/hair-removal',
  '/images/treatments/body-care/perfect-buttocks',
  '/images/treatments/body-care/breast-enhancement',
  '/images/treatments/facials',
  '/images/placeholders/new-doublo',
  '/images/placeholders/body-care',
  '/images/placeholders/facials',
];

// Create directories
function createDirectories() {
  console.log('Creating directory structure...');
  
  for (const dir of directories) {
    const fullPath = path.join(process.cwd(), 'public', dir);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`Creating: ${fullPath}`);
      fs.mkdirSync(fullPath, { recursive: true });
    } else {
      console.log(`Directory already exists: ${fullPath}`);
    }
  }
}

// Copy images to new locations
function copyImages() {
  console.log('\nCopying images to new locations...');
  
  for (const [oldPath, newPath] of Object.entries(imageMap)) {
    const sourcePath = path.join(process.cwd(), 'public', oldPath);
    const destPath = path.join(process.cwd(), 'public', newPath);
    
    // Check if source exists
    if (!fs.existsSync(sourcePath)) {
      console.log(`Error: Source file doesn't exist: ${sourcePath}`);
      continue;
    }
    
    // Create destination directory if it doesn't exist
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copy file
    try {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${oldPath} -> ${newPath}`);
    } catch (error) {
      console.error(`Error copying ${oldPath} to ${newPath}:`, error);
    }
  }
}

// Main execution
function main() {
  console.log('Image Organization Script');
  console.log('========================\n');
  
  createDirectories();
  copyImages();
  
  console.log('\nDone! Images have been organized.');
  console.log('\nNext steps:');
  console.log('1. Verify that the new image paths work in your application');
  console.log('2. After confirming everything works, you can remove the old image files');
  console.log('3. Update any remaining code references to the old image paths');
}

main(); 