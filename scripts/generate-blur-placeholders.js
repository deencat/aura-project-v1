import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TREATMENTS_DIR = path.join(process.cwd(), 'public', 'images', 'treatments');
const PLACEHOLDERS_DIR = path.join(process.cwd(), 'public', 'images', 'placeholders');
const IMAGE_TYPES = ['hero', 'how-it-works', 'benefits', 'results', 'testimonial', 'gallery', 'technology', 'comparison', 'before-after'];
const BLUR_SIZE = 20; // Size to resize the image for blurring
const BLUR_INTENSITY = 8; // Blur intensity (higher = more blur)
const JPEG_QUALITY = 50; // Quality of the output JPEG (0-100)

/**
 * Ensures a directory exists, creating it if necessary
 */
async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch (error) {
    // Directory doesn't exist, create it
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Generate a blurred placeholder image
 */
async function generateBlurPlaceholder(imagePath, outputPath) {
  try {
    // Create an image processor
    const image = sharp(imagePath);
    
    // Get metadata to verify the image is valid
    await image.metadata();
    
    // Generate blur placeholder
    await image
      .resize(BLUR_SIZE) // Small size for blur
      .blur(BLUR_INTENSITY)
      .jpeg({ 
        quality: JPEG_QUALITY,
        mozjpeg: true // Use mozjpeg for better compression
      })
      .toFile(outputPath);
      
    return true;
  } catch (error) {
    if (error.message && error.message.includes('Input file is missing')) {
      console.log(`⚠ Skipping missing file: ${path.basename(imagePath)}`);
    } else if (error.message && error.message.includes('unsupported image format')) {
      console.log(`⚠ Skipping unsupported format: ${path.basename(imagePath)}`);
    } else {
      console.error(`✗ Error processing ${path.basename(imagePath)}:`, error.message);
    }
    return false;
  }
}

/**
 * Find all treatment images and generate blur placeholders
 */
async function processTreatmentImages() {
  try {
    // Ensure placeholders directory exists
    await ensureDir(PLACEHOLDERS_DIR);
    
    // Get all category directories
    const categories = await fs.readdir(TREATMENTS_DIR, { withFileTypes: true });
    
    let totalImages = 0;
    let processedImages = 0;
    
    // Process each category
    for (const category of categories.filter(dirent => dirent.isDirectory())) {
      const categoryPath = path.join(TREATMENTS_DIR, category.name);
      const categoryPlaceholderPath = path.join(PLACEHOLDERS_DIR, category.name);
      
      // Ensure category placeholder directory exists
      await ensureDir(categoryPlaceholderPath);
      
      // Get all treatment directories in this category
      const treatments = await fs.readdir(categoryPath, { withFileTypes: true });
      
      // Process each treatment
      for (const treatment of treatments.filter(dirent => dirent.isDirectory())) {
        const treatmentPath = path.join(categoryPath, treatment.name);
        
        // Get all image files in this treatment
        const files = await fs.readdir(treatmentPath);
        
        // Process each image type
        for (const type of IMAGE_TYPES) {
          // Find all images of this type (including indexed ones like benefits-1.jpg, benefits-2.jpg)
          const typeRegex = new RegExp(`^${type}(-\\d+)?\\.(?:jpg|jpeg|png)$`, 'i');
          const typeImages = files.filter(file => typeRegex.test(file));
          
          totalImages += typeImages.length;
          
          // Process each image of this type
          for (const imageFile of typeImages) {
            const imagePath = path.join(treatmentPath, imageFile);
            const blurFileName = `${type}-blur.jpg`;
            const outputPath = path.join(categoryPlaceholderPath, blurFileName);
            
            console.log(`Processing: ${category.name}/${treatment.name}/${imageFile} -> ${blurFileName}`);
            
            const success = await generateBlurPlaceholder(imagePath, outputPath);
            if (success) {
              processedImages++;
            }
          }
        }
      }
    }
    
    console.log(`\n✨ Processing complete! Generated ${processedImages} blur placeholders from ${totalImages} images.`);
    
  } catch (error) {
    console.error('Error processing treatment images:', error.message);
  }
}

// Start processing
console.log('🔍 Starting blur placeholder generation...');
processTreatmentImages().catch(console.error); 