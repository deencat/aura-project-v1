#!/usr/bin/env node

/**
 * Image Format Generation Script
 * This script converts images in the public/images directory to WebP and AVIF formats
 * It maintains the directory structure and optimizes images for web use
 * 
 * Usage:
 * node scripts/image-processing/generate-formats.js
 * 
 * Options:
 * --dir=path/to/dir  Process only images in the specified directory (default: all)
 * --quality=75       Set the quality for WebP and AVIF formats (default: 75)
 * --force            Force regeneration of existing images
 * --verbose          Show detailed logs during processing
 * 
 * Dependencies:
 * - sharp: For image processing
 * - glob: For file pattern matching
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  baseDir: 'public/images',
  outputFormats: ['webp', 'avif'],
  quality: 75,
  force: false,
  verbose: false,
  dirToProcess: null,
};

// Parse command line arguments
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--dir=')) {
    CONFIG.dirToProcess = arg.split('=')[1];
  } else if (arg.startsWith('--quality=')) {
    CONFIG.quality = parseInt(arg.split('=')[1], 10);
  } else if (arg === '--force') {
    CONFIG.force = true;
  } else if (arg === '--verbose') {
    CONFIG.verbose = true;
  }
});

// Logging utility
function log(message, isVerbose = false) {
  if (isVerbose && !CONFIG.verbose) return;
  console.log(message);
}

/**
 * Generate modern format versions of an image
 * @param {string} filePath Path to the source image
 */
async function processImage(filePath) {
  // Skip already processed images
  if (CONFIG.outputFormats.some(format => filePath.endsWith(`.${format}`))) {
    return;
  }

  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath, path.extname(filePath));
  
  log(`Processing: ${filePath}`, true);

  try {
    // Load the image with sharp
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Generate a blur placeholder for this image
    await image
      .resize({ width: 20 })
      .blur(10)
      .toFile(path.join(fileDir, `${fileName}-blur.jpg`));
    
    // Process each output format
    for (const format of CONFIG.outputFormats) {
      const outputPath = path.join(fileDir, `${fileName}.${format}`);
      
      // Skip if output file exists and we're not forcing regeneration
      if (fs.existsSync(outputPath) && !CONFIG.force) {
        log(`Skipping existing: ${outputPath}`, true);
        continue;
      }

      // Create format-specific conversion
      let formatOptions = {};
      
      if (format === 'webp') {
        formatOptions = { 
          quality: CONFIG.quality,
          effort: 6 // 0-6, higher is slower but better compression
        };
      } else if (format === 'avif') {
        formatOptions = { 
          quality: CONFIG.quality,
          effort: 7 // 0-9, higher is slower but better compression
        };
      }

      // Process and save the image
      await image
        .toFormat(format, formatOptions)
        .toFile(outputPath);
      
      log(`Generated: ${outputPath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main function to process all images in the directory
 */
async function main() {
  // Determine which directory to process
  const processDir = CONFIG.dirToProcess 
    ? path.join(CONFIG.baseDir, CONFIG.dirToProcess)
    : CONFIG.baseDir;
  
  log(`Starting image processing in: ${processDir}`);
  log(`Generating formats: ${CONFIG.outputFormats.join(', ')}`);
  log(`Quality: ${CONFIG.quality}`);
  
  // Find all image files
  const imagePatterns = ['**/*.jpg', '**/*.jpeg', '**/*.png'];
  
  for (const pattern of imagePatterns) {
    const files = glob.sync(path.join(processDir, pattern), { nodir: true });
    log(`Found ${files.length} images matching ${pattern}`, true);
    
    // Process each file
    for (const file of files) {
      await processImage(file);
    }
  }
  
  log('Image processing completed!');
}

// Run the script
main().catch(error => {
  console.error('Error during image processing:', error);
  process.exit(1);
}); 