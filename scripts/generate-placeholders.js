import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TREATMENTS_DIR = path.join(process.cwd(), 'public', 'images', 'treatments');
const PLACEHOLDERS_DIR = path.join(process.cwd(), 'public', 'images', 'placeholders');
const BLUR_SIZE = 20; // Size to resize the image for blurring
const BLUR_QUALITY = 50; // JPEG quality for placeholders
const BLUR_SIGMA = 5; // Blur intensity (higher = more blur)

// Make sure directories exist
async function ensureDirectories() {
  try {
    await fs.mkdir(PLACEHOLDERS_DIR, { recursive: true });
    console.log(`✓ Placeholder directory ready: ${PLACEHOLDERS_DIR}`);
  } catch (err) {
    console.error(`Error creating directories: ${err.message}`);
    process.exit(1);
  }
}

// Process a single image file and create its placeholders
async function processImage(filePath, relativePath) {
  try {
    // Parse components from relative path
    // Example: /new-doublo/v-line/hero.jpg => ['new-doublo', 'v-line', 'hero']
    const pathParts = relativePath.split(path.sep);
    const category = pathParts[0];
    const treatment = pathParts[1];
    const fileNameParts = pathParts[2].split('.');
    const type = fileNameParts[0].split('-')[0]; // Extract the base type (hero, gallery, etc.)
    
    // Create category/treatment subdirectories in placeholders
    const placeholderDir = path.join(PLACEHOLDERS_DIR, category, treatment);
    await fs.mkdir(placeholderDir, { recursive: true });
    
    // Create blur placeholder
    const placeholderPath = path.join(placeholderDir, `${type}-blur.jpg`);
    
    // Skip if placeholder already exists and is newer than the source image
    try {
      const placeholderStat = await fs.stat(placeholderPath);
      const originalStat = await fs.stat(filePath);
      
      if (placeholderStat.mtime > originalStat.mtime) {
        console.log(`⏭️  Skipping ${relativePath} (placeholder is up-to-date)`);
        return;
      }
    } catch (statErr) {
      // Placeholder doesn't exist or can't be accessed, continue processing
    }
    
    // Generate placeholder
    await sharp(filePath)
      .resize(BLUR_SIZE, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .blur(BLUR_SIGMA)
      .jpeg({ quality: BLUR_QUALITY })
      .toFile(placeholderPath);
    
    // Generate tiny base64 SVG version for inline use
    const tinyBuffer = await sharp(filePath)
      .resize(BLUR_SIZE, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .blur(BLUR_SIGMA * 2) // More blur for the inline version
      .toBuffer();
    
    // Create a data file containing the base64 data
    const dataPath = path.join(placeholderDir, `${type}-data.json`);
    const base64Data = `data:image/jpeg;base64,${tinyBuffer.toString('base64')}`;
    await fs.writeFile(dataPath, JSON.stringify({ base64: base64Data }));
    
    console.log(`✓ Generated placeholder for ${relativePath}`);
  } catch (err) {
    console.error(`❌ Error processing ${relativePath}: ${err.message}`);
  }
}

// Recursively process all images in a directory
async function processDirectory(directory, baseDir = TREATMENTS_DIR) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath, baseDir);
    } else if (entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name)) {
      const relativePath = path.relative(baseDir, fullPath);
      await processImage(fullPath, relativePath);
    }
  }
}

// Create a set of generic fallback placeholders
async function generateGenericPlaceholders() {
  const genericTypes = ['hero', 'gallery', 'technology', 'benefits', 'testimonial', 'results', 'how-it-works', 'before-after', 'comparison'];
  const genericDir = path.join(PLACEHOLDERS_DIR, 'generic');
  
  await fs.mkdir(genericDir, { recursive: true });
  
  // Create a simple colored rectangle for each type
  for (const type of genericTypes) {
    try {
      // Generate a solid color SVG with appropriate dimensions
      let width = 800;
      let height = 600;
      
      // Customize dimensions based on type
      if (type === 'hero') {
        width = 1200;
        height = 675;
      } else if (type === 'testimonial') {
        width = 128;
        height = 128;
      } else if (type === 'before-after') {
        width = 800;
        height = 800;
      }
      
      // Create a gradient placeholder
      const svg = Buffer.from(`
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${width}" height="${height}" fill="url(#grad)" />
          <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#adb5bd" text-anchor="middle" dominant-baseline="middle">
            ${type}
          </text>
        </svg>
      `);
      
      // Save as JPEG
      await sharp(svg)
        .jpeg({ quality: 80 })
        .toFile(path.join(genericDir, `${type}.jpg`));
      
      // Save blur version
      await sharp(svg)
        .resize(BLUR_SIZE)
        .blur(BLUR_SIGMA)
        .jpeg({ quality: BLUR_QUALITY })
        .toFile(path.join(genericDir, `${type}-blur.jpg`));
      
      console.log(`✓ Generated generic placeholder for ${type}`);
    } catch (err) {
      console.error(`❌ Error generating generic placeholder for ${type}: ${err.message}`);
    }
  }
}

// Main function
async function main() {
  console.log('🔄 Starting placeholder generation...');
  
  try {
    // Make sure all required directories exist
    await ensureDirectories();
    
    // Generate generic fallback placeholders
    await generateGenericPlaceholders();
    
    // Process all images in the treatments directory
    await processDirectory(TREATMENTS_DIR);
    
    console.log('✅ Placeholder generation complete!');
  } catch (err) {
    console.error(`❌ Error during placeholder generation: ${err.message}`);
    process.exit(1);
  }
}

main(); 