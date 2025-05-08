import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateWebPAndBlur(imagePath) {
  try {
    // Try to load the image with Sharp
    const image = sharp(imagePath);
    
    // Get metadata to verify the image is valid
    await image.metadata();
    
    // Generate WebP version
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await image
      .webp({ 
        quality: 80,
        effort: 6 // Higher compression effort
      })
      .toFile(webpPath);

    // Generate AVIF version
    const avifPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    await image
      .avif({
        quality: 75,
        effort: 8, // Higher compression effort for AVIF
        chromaSubsampling: '4:2:0' // Better compression
      })
      .toFile(avifPath);
    
    // Generate blur placeholder
    const blurPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '-blur.jpg');
    await image
      .resize(20) // Small size for blur
      .blur(10)
      .jpeg({ 
        quality: 30,
        mozjpeg: true // Use mozjpeg for better compression
      })
      .toFile(blurPath);
      
    console.log(`✓ Processed: ${path.basename(imagePath)} (WebP, AVIF, and blur generated)`);
  } catch (error) {
    if (error.message.includes('Input file is missing')) {
      console.log(`⚠ Skipping missing file: ${path.basename(imagePath)}`);
    } else if (error.message.includes('unsupported image format')) {
      console.log(`⚠ Skipping unsupported format: ${path.basename(imagePath)}`);
    } else {
      console.error(`✗ Error processing ${path.basename(imagePath)}:`, error.message);
    }
  }
}

async function processDirectory(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    const processPromises = entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else if (
        entry.isFile() && 
        /\.(jpg|jpeg|png)$/i.test(entry.name) &&
        !entry.name.includes('-blur') &&
        !entry.name.includes('.temp.')
      ) {
        await generateWebPAndBlur(fullPath);
      }
    });
    
    await Promise.all(processPromises);
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
}

async function main() {
  console.log('🔄 Starting image optimization...');
  
  const publicDir = path.join(process.cwd(), 'public', 'images');
  await processDirectory(publicDir);
  
  console.log('✨ Image optimization complete!');
}

main().catch(console.error); 