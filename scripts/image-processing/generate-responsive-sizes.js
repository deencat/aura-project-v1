#!/usr/bin/env node

/**
 * Responsive Image Size Generator
 * This script creates multiple sizes of images optimized for different viewport widths
 * It keeps the same aspect ratio while generating different resolutions
 * 
 * Usage:
 * node scripts/image-processing/generate-responsive-sizes.js
 * 
 * Options:
 * --dir=path/to/dir       Process only images in the specified directory (default: all)
 * --sizes=320,768,1024    Comma-separated list of widths to generate (default: see below)
 * --format=webp           Output format: webp, avif, or both (default: webp)
 * --quality=75            Quality setting for output images (default: 75)
 * --suffix=true           Add width suffix to filenames (default: true)
 * --force                 Force regeneration of existing images
 * --verbose               Show detailed logs during processing
 * 
 * Dependencies:
 * - sharp: For image processing and resizing
 * - glob: For file pattern matching
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  baseDir: 'public/images',
  // Common viewport breakpoints and sizes
  defaultSizes: [320, 640, 768, 1024, 1366, 1920],
  outputFormat: 'webp',
  quality: 75,
  addWidthSuffix: true,
  force: false,
  verbose: false,
  dirToProcess: null,
  customSizes: null,
};

// Parse command line arguments
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--dir=')) {
    CONFIG.dirToProcess = arg.split('=')[1];
  } else if (arg.startsWith('--sizes=')) {
    CONFIG.customSizes = arg.split('=')[1].split(',').map(s => parseInt(s.trim(), 10));
  } else if (arg.startsWith('--format=')) {
    CONFIG.outputFormat = arg.split('=')[1];
  } else if (arg.startsWith('--quality=')) {
    CONFIG.quality = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('--suffix=')) {
    CONFIG.addWidthSuffix = arg.split('=')[1] === 'true';
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
 * Generate responsive sizes for a single image
 * @param {string} filePath Path to the source image
 */
async function processImage(filePath) {
  // Skip non-image files or already processed responsive images
  if (filePath.includes('-responsive-') || filePath.includes('-blur.jpg')) {
    return;
  }

  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath, path.extname(filePath));
  
  log(`Processing: ${filePath}`, true);

  try {
    // Load the image with sharp
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Determine which sizes to generate
    const sizes = CONFIG.customSizes || CONFIG.defaultSizes;
    
    // Only generate sizes smaller than the original image
    const targetSizes = sizes.filter(size => size < metadata.width);
    
    if (targetSizes.length === 0) {
      log(`Image ${filePath} is smaller than smallest target size. Skipping.`, true);
      return;
    }
    
    // Create each responsive size
    for (const width of targetSizes) {
      // Generate the output filename
      const outputName = CONFIG.addWidthSuffix
        ? `${fileName}-responsive-${width}`
        : `${fileName}-responsive`;
      
      // Process both formats if requested
      const formats = CONFIG.outputFormat === 'both'
        ? ['webp', 'avif']
        : [CONFIG.outputFormat];
      
      for (const format of formats) {
        const outputPath = path.join(fileDir, `${outputName}.${format}`);
        
        // Skip if output file exists and we're not forcing regeneration
        if (fs.existsSync(outputPath) && !CONFIG.force) {
          log(`Skipping existing: ${outputPath}`, true);
          continue;
        }
        
        // Create format-specific conversion options
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
        
        // Process and save the resized image
        await image
          .resize({ 
            width,
            withoutEnlargement: true, // Don't upscale images
            fit: 'inside' // Maintain aspect ratio
          })
          .toFormat(format, formatOptions)
          .toFile(outputPath);
        
        log(`Generated: ${outputPath}`);
      }
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
  
  log(`Starting responsive image generation in: ${processDir}`);
  log(`Target sizes: ${CONFIG.customSizes || CONFIG.defaultSizes}`);
  log(`Output format: ${CONFIG.outputFormat}`);
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
  
  log('Responsive image generation completed!');
}

// Run the script
main().catch(error => {
  console.error('Error during responsive image generation:', error);
  process.exit(1);
}); 