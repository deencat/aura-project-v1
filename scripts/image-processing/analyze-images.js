#!/usr/bin/env node

/**
 * Image Analysis Script
 * This script analyzes images in the public/images directory to:
 * - Report sizes across different formats (original, WebP, AVIF)
 * - Identify unoptimized images
 * - Calculate potential savings
 * - Recommend optimization strategies
 * 
 * Usage:
 * node scripts/image-processing/analyze-images.js
 * 
 * Options:
 * --dir=path/to/dir      Analyze only images in the specified directory (default: all)
 * --threshold=100        Minimum file size in KB to include in the report (default: 50)
 * --format=csv           Output format: text, json, csv (default: text)
 * --verbose              Show detailed logs for every image
 * --missing-only         Report only images missing optimized versions
 * 
 * Dependencies:
 * - sharp: For image metadata
 * - glob: For file pattern matching
 * - fs: For file system operations
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  baseDir: 'public/images',
  targetFormats: ['webp', 'avif'],
  sizeThreshold: 50 * 1024, // 50KB
  outputFormat: 'text',
  verbose: false,
  dirToAnalyze: null,
  missingOnly: false,
};

// Parse command line arguments
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--dir=')) {
    CONFIG.dirToAnalyze = arg.split('=')[1];
  } else if (arg.startsWith('--threshold=')) {
    CONFIG.sizeThreshold = parseInt(arg.split('=')[1], 10) * 1024;
  } else if (arg.startsWith('--format=')) {
    CONFIG.outputFormat = arg.split('=')[1];
  } else if (arg === '--verbose') {
    CONFIG.verbose = true;
  } else if (arg === '--missing-only') {
    CONFIG.missingOnly = true;
  }
});

// Logging utility
function log(message, isVerbose = false) {
  if (isVerbose && !CONFIG.verbose) return;
  console.log(message);
}

// Format bytes to human-readable size
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

// Calculate percentage reduction
function calculateReduction(original, optimized) {
  return ((original - optimized) / original * 100).toFixed(1) + '%';
}

/**
 * Analyze a specific image and its optimized versions
 * @param {string} filePath Path to the original image
 * @returns {Object} Analysis results
 */
async function analyzeImage(filePath) {
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath, path.extname(filePath));
  const originalExt = path.extname(filePath).slice(1);
  const originalStats = fs.statSync(filePath);
  const result = {
    originalPath: filePath,
    originalSize: originalStats.size,
    originalFormat: originalExt,
    width: 0,
    height: 0,
    hasBlurPlaceholder: false,
    optimizedVersions: {}
  };
  
  // Skip if the original file is below the threshold
  if (originalStats.size < CONFIG.sizeThreshold && !CONFIG.verbose) {
    return null;
  }
  
  // Get image metadata
  try {
    const metadata = await sharp(filePath).metadata();
    result.width = metadata.width;
    result.height = metadata.height;
    
    // Check for blur placeholder
    const blurPath = path.join(fileDir, `${fileName}-blur.jpg`);
    result.hasBlurPlaceholder = fs.existsSync(blurPath);
    
    // Check for optimized versions
    for (const format of CONFIG.targetFormats) {
      const optimizedPath = path.join(fileDir, `${fileName}.${format}`);
      
      if (fs.existsSync(optimizedPath)) {
        const optimizedStats = fs.statSync(optimizedPath);
        result.optimizedVersions[format] = {
          exists: true,
          size: optimizedStats.size,
          reduction: calculateReduction(originalStats.size, optimizedStats.size),
          path: optimizedPath
        };
      } else {
        result.optimizedVersions[format] = {
          exists: false,
          size: 0,
          reduction: '0%',
          path: null
        };
      }
    }
    
    // Skip reporting if missingOnly flag is set and all formats exist
    if (CONFIG.missingOnly && 
        Object.values(result.optimizedVersions).every(v => v.exists)) {
      return null;
    }
    
    return result;
  } catch (error) {
    log(`Error analyzing ${filePath}: ${error.message}`, true);
    return null;
  }
}

/**
 * Generate a summary report of all analyzed images
 * @param {Array} results Analysis results for all images
 */
function generateReport(results) {
  // Calculate summary metrics
  const validResults = results.filter(r => r !== null);
  
  if (validResults.length === 0) {
    console.log('No images meeting criteria found for analysis.');
    return;
  }
  
  const totalOriginalSize = validResults.reduce((sum, r) => sum + r.originalSize, 0);
  const formatTotals = {};
  const missingOptimizations = {};
  
  CONFIG.targetFormats.forEach(format => {
    formatTotals[format] = validResults.reduce((sum, r) => {
      return sum + (r.optimizedVersions[format].exists ? r.optimizedVersions[format].size : 0);
    }, 0);
    
    missingOptimizations[format] = validResults.filter(r => !r.optimizedVersions[format].exists).length;
  });
  
  const missingBlurPlaceholders = validResults.filter(r => !r.hasBlurPlaceholder).length;
  
  // Output the report based on the selected format
  if (CONFIG.outputFormat === 'json') {
    // JSON output
    console.log(JSON.stringify({
      summary: {
        totalImages: validResults.length,
        totalOriginalSize: totalOriginalSize,
        formatTotals: formatTotals,
        missingOptimizations: missingOptimizations,
        missingBlurPlaceholders: missingBlurPlaceholders,
      },
      images: validResults
    }, null, 2));
  } else if (CONFIG.outputFormat === 'csv') {
    // CSV output
    const header = 'original_path,original_size,width,height,has_placeholder';
    CONFIG.targetFormats.forEach(format => {
      header += `,${format}_exists,${format}_size,${format}_reduction`;
    });
    console.log(header);
    
    validResults.forEach(r => {
      let line = `${r.originalPath},${r.originalSize},${r.width},${r.height},${r.hasBlurPlaceholder}`;
      CONFIG.targetFormats.forEach(format => {
        const opt = r.optimizedVersions[format];
        line += `,${opt.exists},${opt.size},${opt.reduction}`;
      });
      console.log(line);
    });
  } else {
    // Text output (default)
    console.log('\n======================== IMAGE ANALYSIS REPORT ========================');
    console.log(`Total images analyzed: ${validResults.length}`);
    console.log(`Total original size: ${formatBytes(totalOriginalSize)}`);
    
    CONFIG.targetFormats.forEach(format => {
      const reduction = calculateReduction(totalOriginalSize, formatTotals[format]);
      console.log(`Total ${format.toUpperCase()} size: ${formatBytes(formatTotals[format])} (${reduction} reduction)`);
    });
    
    console.log('\n----- Optimization Status -----');
    CONFIG.targetFormats.forEach(format => {
      console.log(`Missing ${format.toUpperCase()} versions: ${missingOptimizations[format]}/${validResults.length}`);
    });
    console.log(`Missing blur placeholders: ${missingBlurPlaceholders}/${validResults.length}`);
    
    // Output the largest images that could benefit from optimization
    console.log('\n----- Top 10 Images for Optimization -----');
    const sortedResults = [...validResults].sort((a, b) => b.originalSize - a.originalSize).slice(0, 10);
    
    sortedResults.forEach((r, i) => {
      console.log(`\n${i+1}. ${r.originalPath}`);
      console.log(`   Size: ${formatBytes(r.originalSize)} (${r.width}x${r.height})`);
      console.log(`   Has blur placeholder: ${r.hasBlurPlaceholder ? 'Yes' : 'No'}`);
      
      CONFIG.targetFormats.forEach(format => {
        const opt = r.optimizedVersions[format];
        if (opt.exists) {
          console.log(`   ${format.toUpperCase()}: ${formatBytes(opt.size)} (${opt.reduction} reduction)`);
        } else {
          console.log(`   ${format.toUpperCase()}: Missing`);
        }
      });
    });
    
    console.log('\n----- Optimization Recommendations -----');
    console.log('1. Run the following command to generate missing optimized images:');
    console.log('   npm run optimize-images');
    console.log('2. Run the following command to generate missing blur placeholders:');
    console.log('   npm run generate-placeholders');
    console.log('3. Consider lazy loading large images with priority=false');
    console.log('4. Ensure content-visibility:auto is set for below-the-fold images');
    console.log('======================================================================\n');
  }
}

/**
 * Main function to analyze all images in the directory
 */
async function main() {
  // Determine which directory to analyze
  const processDir = CONFIG.dirToAnalyze 
    ? path.join(CONFIG.baseDir, CONFIG.dirToAnalyze)
    : CONFIG.baseDir;
  
  log(`Starting image analysis in: ${processDir}`);
  log(`Minimum file size threshold: ${formatBytes(CONFIG.sizeThreshold)}`);
  
  // Find all image files
  const imagePatterns = ['**/*.jpg', '**/*.jpeg', '**/*.png'];
  const allFiles = [];
  
  for (const pattern of imagePatterns) {
    const files = glob.sync(path.join(processDir, pattern), { nodir: true });
    log(`Found ${files.length} images matching ${pattern}`, true);
    allFiles.push(...files);
  }
  
  // Analyze each file
  log(`Analyzing ${allFiles.length} images...`);
  const results = [];
  
  for (const file of allFiles) {
    const result = await analyzeImage(file);
    if (result !== null) {
      results.push(result);
    }
  }
  
  // Generate report
  generateReport(results);
}

// Run the script
main().catch(error => {
  console.error('Error during image analysis:', error);
  process.exit(1);
}); 