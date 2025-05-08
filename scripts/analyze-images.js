import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ANALYZE_DIRS = ['images/treatments', 'images/placeholders', 'assets/images'];
const OUTPUT_FILE = path.join(process.cwd(), 'image-analysis.md');

// File size formatting
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Calculate potential savings with WebP and AVIF
async function estimateSavings(filePath, fileSize) {
  try {
    // Create buffer from original image
    const imageBuffer = await fs.readFile(filePath);
    
    // Calculate WebP size at quality 80
    const webpBuffer = await sharp(imageBuffer)
      .webp({ quality: 80, effort: 5 })
      .toBuffer();
    
    // Calculate AVIF size at quality 65 (slightly lower quality but much better compression)
    const avifBuffer = await sharp(imageBuffer)
      .avif({ quality: 65, effort: 7 })
      .toBuffer();
    
    const webpSize = webpBuffer.length;
    const avifSize = avifBuffer.length;
    
    const webpSavings = ((fileSize - webpSize) / fileSize * 100).toFixed(2);
    const avifSavings = ((fileSize - avifSize) / fileSize * 100).toFixed(2);
    
    return {
      original: formatBytes(fileSize),
      webp: {
        size: formatBytes(webpSize),
        savings: `${webpSavings}%`
      },
      avif: {
        size: formatBytes(avifSize),
        savings: `${avifSavings}%`
      }
    };
  } catch (err) {
    return {
      original: formatBytes(fileSize),
      webp: { size: 'Error', savings: 'N/A' },
      avif: { size: 'Error', savings: 'N/A' }
    };
  }
}

// Get image dimensions and metadata
async function getImageInfo(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      space: metadata.space,
      channels: metadata.channels,
      depth: metadata.depth,
      isProgressive: metadata.isProgressive,
      hasProfile: metadata.hasProfile,
      hasAlpha: metadata.hasAlpha
    };
  } catch (err) {
    return { error: err.message };
  }
}

// Scan directory for images
async function scanDirectory(directory) {
  const results = [];
  const entries = await fs.readdir(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      const subdirResults = await scanDirectory(fullPath);
      results.push(...subdirResults);
    } else if (entry.isFile() && /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(entry.name)) {
      const stats = await fs.stat(fullPath);
      const relativePath = path.relative(PUBLIC_DIR, fullPath);
      
      // Get image information and estimated savings
      const info = await getImageInfo(fullPath);
      const savings = await estimateSavings(fullPath, stats.size);
      
      results.push({
        path: relativePath,
        size: stats.size,
        formattedSize: formatBytes(stats.size),
        lastModified: stats.mtime,
        info,
        savings
      });
    }
  }
  
  return results;
}

// Generate Markdown report
function generateReport(results) {
  // Sort by size (largest first)
  results.sort((a, b) => b.size - a.size);
  
  // Calculate total size
  const totalSize = results.reduce((sum, item) => sum + item.size, 0);
  
  // Estimate total potential savings
  const totalWebpSize = results.reduce((sum, item) => {
    if (item.savings.webp.size !== 'Error') {
      const match = item.savings.webp.size.match(/^([\d.]+) (\w+)$/);
      if (match) {
        const [_, size, unit] = match;
        const multiplier = unit === 'KB' ? 1024 : unit === 'MB' ? 1024 * 1024 : 1;
        return sum + parseFloat(size) * multiplier;
      }
    }
    return sum;
  }, 0);
  
  const totalAvifSize = results.reduce((sum, item) => {
    if (item.savings.avif.size !== 'Error') {
      const match = item.savings.avif.size.match(/^([\d.]+) (\w+)$/);
      if (match) {
        const [_, size, unit] = match;
        const multiplier = unit === 'KB' ? 1024 : unit === 'MB' ? 1024 * 1024 : 1;
        return sum + parseFloat(size) * multiplier;
      }
    }
    return sum;
  }, 0);
  
  const webpSavingsPercent = ((totalSize - totalWebpSize) / totalSize * 100).toFixed(2);
  const avifSavingsPercent = ((totalSize - totalAvifSize) / totalSize * 100).toFixed(2);
  
  let report = `# Image Analysis Report\n\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  
  report += `## Summary\n\n`;
  report += `- Total images analyzed: ${results.length}\n`;
  report += `- Total size of images: ${formatBytes(totalSize)}\n`;
  report += `- Potential savings with WebP: ${formatBytes(totalSize - totalWebpSize)} (${webpSavingsPercent}%)\n`;
  report += `- Potential savings with AVIF: ${formatBytes(totalSize - totalAvifSize)} (${avifSavingsPercent}%)\n\n`;
  
  report += `## Largest Images\n\n`;
  report += `| File | Size | Dimensions | Format | WebP Size (Savings) | AVIF Size (Savings) |\n`;
  report += `|------|------|------------|--------|---------------------|---------------------|\n`;
  
  // Include top 20 largest images
  results.slice(0, 20).forEach(item => {
    const dimensions = item.info.width && item.info.height ? 
      `${item.info.width}×${item.info.height}` : 'N/A';
    const format = item.info.format || 'N/A';
    
    report += `| ${item.path} | ${item.formattedSize} | ${dimensions} | ${format} | ${item.savings.webp.size} (${item.savings.webp.savings}) | ${item.savings.avif.size} (${item.savings.avif.savings}) |\n`;
  });
  
  report += `\n## Format Distribution\n\n`;
  
  // Group by format
  const formatGroups = {};
  results.forEach(item => {
    const format = item.info.format || 'unknown';
    if (!formatGroups[format]) {
      formatGroups[format] = {
        count: 0,
        totalSize: 0
      };
    }
    formatGroups[format].count++;
    formatGroups[format].totalSize += item.size;
  });
  
  report += `| Format | Count | Total Size | Percent of Total |\n`;
  report += `|--------|-------|------------|------------------|\n`;
  
  Object.entries(formatGroups).forEach(([format, data]) => {
    const percent = (data.totalSize / totalSize * 100).toFixed(2);
    report += `| ${format} | ${data.count} | ${formatBytes(data.totalSize)} | ${percent}% |\n`;
  });
  
  report += `\n## Recommendations\n\n`;
  report += `1. **Convert JPEG and PNG images to modern formats**:\n`;
  report += `   - Use WebP for wider browser support with ~${webpSavingsPercent}% smaller files\n`;
  report += `   - Use AVIF for best compression with ~${avifSavingsPercent}% smaller files\n`;
  report += `2. **Resize large images**:\n`;
  
  // Find oversized images (larger than 2000px in any dimension)
  const oversizedImages = results.filter(item => 
    item.info.width > 2000 || item.info.height > 2000
  );
  
  if (oversizedImages.length > 0) {
    report += `   - ${oversizedImages.length} images are larger than 2000px in at least one dimension\n`;
    report += `   - Consider resizing these images to appropriate dimensions\n`;
  } else {
    report += `   - No extremely large images found\n`;
  }
  
  report += `3. **Enable AVIF and WebP in next.config.js**:\n`;
  report += "```js\nmodule.exports = {\n  images: {\n    formats: ['image/avif', 'image/webp']\n  }\n}\n```\n\n";
  
  return report;
}

// Main function
async function main() {
  console.log('🔍 Analyzing images...');
  
  try {
    let allResults = [];
    
    // Scan all configured directories
    for (const dir of ANALYZE_DIRS) {
      const fullDir = path.join(PUBLIC_DIR, dir);
      try {
        await fs.access(fullDir);
        console.log(`Scanning ${dir}...`);
        const results = await scanDirectory(fullDir);
        allResults = [...allResults, ...results];
      } catch (accessErr) {
        console.warn(`⚠️ Directory not found: ${dir}`);
      }
    }
    
    if (allResults.length === 0) {
      console.warn('⚠️ No images found to analyze');
      return;
    }
    
    console.log(`Found ${allResults.length} images`);
    
    // Generate report
    const report = generateReport(allResults);
    
    // Write report to file
    await fs.writeFile(OUTPUT_FILE, report);
    
    console.log(`✅ Analysis complete! Report saved to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error(`❌ Error during image analysis: ${err.message}`);
    process.exit(1);
  }
}

main(); 