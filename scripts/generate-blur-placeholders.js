const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Categories and types to process
const categories = ['about', 'contact', 'facial-treatments', 'new-doublo', 'body-care'];
const types = ['hero', 'gallery', 'benefits', 'results', 'testimonial', 'technology', 'before-after', 'comparison', 'how-it-works'];

// Base directories
const placeholdersDir = path.join(__dirname, '../public/images/placeholders');

// Function to generate a blur placeholder
async function generateBlurPlaceholder(inputPath, outputPath) {
  try {
    if (!fs.existsSync(inputPath)) {
      console.warn(`Source image not found: ${inputPath}`);
      return false;
    }

    // Create tiny blurred version (10px wide)
    await sharp(inputPath)
      .resize(10)
      .blur(3)
      .toFormat('jpeg', { quality: 40 })
      .toFile(outputPath);
    
    console.log(`Created blur placeholder: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
    return false;
  }
}

// Ensure output directories exist
async function ensureDirectoriesExist() {
  for (const category of categories) {
    const categoryDir = path.join(placeholdersDir, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
  }
}

// Process all placeholder images
async function processPlaceholders() {
  let totalProcessed = 0;
  let totalSuccess = 0;

  await ensureDirectoriesExist();

  for (const category of categories) {
    for (const type of types) {
      const inputPath = path.join(placeholdersDir, category, `${type}.jpg`);
      const outputPath = path.join(placeholdersDir, category, `${type}-blur.jpg`);
      
      totalProcessed++;
      if (await generateBlurPlaceholder(inputPath, outputPath)) {
        totalSuccess++;
      }
    }
  }

  console.log(`\nProcessing complete: ${totalSuccess}/${totalProcessed} blur placeholders generated.`);
}

// Run the process
processPlaceholders().catch(err => {
  console.error('Error during processing:', err);
  process.exit(1);
}); 