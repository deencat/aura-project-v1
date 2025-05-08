#!/usr/bin/env node

/**
 * Blur Placeholder Generator
 * This script creates low-resolution, blurred images to use as placeholders during image loading
 * It also generates base64-encoded data URIs for inline embedding in HTML/CSS
 * 
 * Usage:
 * node scripts/image-processing/generate-placeholders.js
 * 
 * Options:
 * --dir=path/to/dir       Process only images in the specified directory (default: all)
 * --size=20               Size of the placeholder image width in pixels (default: 20)
 * --blur=10               Blur radius to apply (default: 10)
 * --quality=60            JPEG quality for the placeholder (default: 60)
 * --format=jpg            Output format: jpg or webp (default: jpg)
 * --data-uri=true         Generate data URI file alongside the image (default: true)
 * --force                 Force regeneration of existing placeholders
 * --verbose               Show detailed logs during processing
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
  placeholderSize: 20,
  blurRadius: 10,
  quality: 60,
  outputFormat: 'jpg',
  generateDataURI: true,
  force: false,
  verbose: false,
  dirToProcess: null,
};

// Parse command line arguments
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--dir=')) {
    CONFIG.dirToProcess = arg.split('=')[1];
  } else if (arg.startsWith('--size=')) {
    CONFIG.placeholderSize = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('--blur=')) {
    CONFIG.blurRadius = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('--quality=')) {
    CONFIG.quality = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('--format=')) {
    CONFIG.outputFormat = arg.split('=')[1];
  } else if (arg.startsWith('--data-uri=')) {
    CONFIG.generateDataURI = arg.split('=')[1] === 'true';
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
 * Generate a blurred placeholder image and optional data URI
 * @param {string} filePath Path to the source image
 */
async function generatePlaceholder(filePath) {
  // Skip if the file is already a placeholder
  if (filePath.includes('-blur.') || filePath.includes('-placeholder.')) {
    return;
  }

  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath, path.extname(filePath));
  const placeholderPath = path.join(fileDir, `${fileName}-blur.${CONFIG.outputFormat}`);
  const dataURIPath = path.join(fileDir, `${fileName}-blur.txt`);
  
  log(`Processing: ${filePath}`, true);

  // Skip if the placeholder exists and we're not forcing regeneration
  if (fs.existsSync(placeholderPath) && !CONFIG.force) {
    log(`Placeholder already exists: ${placeholderPath}`, true);
    return;
  }

  try {
    // Create the blur placeholder
    const placeholderImage = sharp(filePath)
      .resize(CONFIG.placeholderSize)
      .blur(CONFIG.blurRadius);
    
    // Format-specific options
    if (CONFIG.outputFormat === 'jpg' || CONFIG.outputFormat === 'jpeg') {
      placeholderImage.jpeg({ quality: CONFIG.quality });
    } else if (CONFIG.outputFormat === 'webp') {
      placeholderImage.webp({ quality: CONFIG.quality });
    }
    
    // Save the placeholder image
    await placeholderImage.toFile(placeholderPath);
    log(`Generated placeholder: ${placeholderPath}`);
    
    // Generate data URI if requested
    if (CONFIG.generateDataURI) {
      // Get the placeholder as a Buffer
      const placeholderBuffer = await sharp(filePath)
        .resize(CONFIG.placeholderSize)
        .blur(CONFIG.blurRadius);
      
      // Format-specific options for Buffer
      let outputBuffer;
      if (CONFIG.outputFormat === 'jpg' || CONFIG.outputFormat === 'jpeg') {
        outputBuffer = await placeholderBuffer.jpeg({ quality: CONFIG.quality }).toBuffer();
      } else if (CONFIG.outputFormat === 'webp') {
        outputBuffer = await placeholderBuffer.webp({ quality: CONFIG.quality }).toBuffer();
      }
      
      // Convert to base64 data URI
      const mimeType = CONFIG.outputFormat === 'jpg' || CONFIG.outputFormat === 'jpeg' 
        ? 'image/jpeg' 
        : 'image/webp';
      const dataURI = `data:${mimeType};base64,${outputBuffer.toString('base64')}`;
      
      // Save to a text file for easy access
      fs.writeFileSync(dataURIPath, dataURI);
      log(`Generated data URI: ${dataURIPath}`);
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
  
  log(`Starting placeholder generation in: ${processDir}`);
  log(`Placeholder size: ${CONFIG.placeholderSize}px width`);
  log(`Blur radius: ${CONFIG.blurRadius}`);
  log(`Output format: ${CONFIG.outputFormat}`);
  
  // Find all image files
  const imagePatterns = ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp'];
  
  for (const pattern of imagePatterns) {
    const files = glob.sync(path.join(processDir, pattern), { nodir: true });
    log(`Found ${files.length} images matching ${pattern}`, true);
    
    // Process each file
    for (const file of files) {
      await generatePlaceholder(file);
    }
  }
  
  log('Placeholder generation completed!');
}

// Run the script
main().catch(error => {
  console.error('Error during placeholder generation:', error);
  process.exit(1);
}); 