/**
 * Script to update existing pages to use the enhanced TreatmentImage component
 * 
 * This script:
 * 1. Scans treatment pages for Image components
 * 2. Identifies images that should be replaced with TreatmentImage
 * 3. Generates a report of changes needed
 * 
 * Usage: node src/scripts/update-treatment-pages.js
 */

const fs = require('fs');
const path = require('path');

// Constants
const TREATMENTS_APP_DIR = path.join(process.cwd(), 'src', 'app', 'treatments');
const BODY_CARE_APP_DIR = path.join(process.cwd(), 'src', 'app', 'body-care');
const NEW_DOUBLO_APP_DIR = path.join(process.cwd(), 'src', 'app', 'new-doublo');

// Function to get all treatment page files
function getTreatmentPageFiles() {
  const pageFiles = [];
  
  // Helper function to scan directories
  const scanDirectory = (dir, category) => {
    if (!fs.existsSync(dir)) return;
    
    const treatments = fs.readdirSync(dir)
      .filter(item => {
        const itemPath = path.join(dir, item);
        return fs.statSync(itemPath).isDirectory();
      });
    
    treatments.forEach(treatment => {
      const treatmentDir = path.join(dir, treatment);
      
      // Look for page.tsx file
      const pagePath = path.join(treatmentDir, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        pageFiles.push({
          path: pagePath,
          category,
          treatment
        });
      }
      
      // Look for component files
      const componentsDir = path.join(treatmentDir, '_components');
      if (fs.existsSync(componentsDir)) {
        const componentFiles = fs.readdirSync(componentsDir)
          .filter(file => file.endsWith('.tsx'))
          .map(file => ({
            path: path.join(componentsDir, file),
            category,
            treatment,
            isComponent: true
          }));
        
        pageFiles.push(...componentFiles);
      }
    });
  };
  
  // Scan all treatment directories
  scanDirectory(TREATMENTS_APP_DIR, 'facials');
  scanDirectory(BODY_CARE_APP_DIR, 'body-care');
  scanDirectory(NEW_DOUBLO_APP_DIR, 'new-doublo');
  
  return pageFiles;
}

// Function to analyze a file for Image components
function analyzeFile(filePath, category, treatment) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const imageImports = lines.some(line => 
    line.includes('import Image from \'next/image\'') || 
    line.includes('import { Image }')
  );
  
  const treatmentImageImports = lines.some(line => 
    line.includes('import TreatmentImage from')
  );
  
  // Count Image components
  const imageComponentCount = content.match(/<Image\s/g)?.length || 0;
  
  // Count TreatmentImage components
  const treatmentImageCount = content.match(/<TreatmentImage\s/g)?.length || 0;
  
  // Check for image paths that match treatment patterns
  const treatmentImagePaths = [];
  const imageRegex = /<Image[^>]*src=["']([^"']+)["'][^>]*>/g;
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.includes('/treatments/') || 
        src.includes(`/${category}/`) || 
        src.includes(`/${treatment}/`)) {
      treatmentImagePaths.push(src);
    }
  }
  
  return {
    path: filePath,
    hasImageImport: imageImports,
    hasTreatmentImageImport: treatmentImageImports,
    imageComponentCount,
    treatmentImageCount,
    treatmentImagePaths,
    needsUpdate: imageComponentCount > 0 && treatmentImagePaths.length > 0
  };
}

// Main function
function updateTreatmentPages() {
  console.log('Analyzing treatment pages...');
  
  const pageFiles = getTreatmentPageFiles();
  console.log(`Found ${pageFiles.length} treatment page files`);
  
  const analysisResults = pageFiles.map(file => ({
    ...file,
    ...analyzeFile(file.path, file.category, file.treatment)
  }));
  
  // Filter pages that need updates
  const pagesToUpdate = analysisResults.filter(result => result.needsUpdate);
  
  console.log('\nPages that need TreatmentImage updates:');
  pagesToUpdate.forEach(page => {
    console.log(`\n- ${page.path}`);
    console.log(`  Category: ${page.category}, Treatment: ${page.treatment}`);
    console.log(`  Image components: ${page.imageComponentCount}, TreatmentImage components: ${page.treatmentImageCount}`);
    console.log('  Image paths that should use TreatmentImage:');
    page.treatmentImagePaths.forEach(path => {
      console.log(`    - ${path}`);
    });
  });
  
  console.log(`\nTotal pages needing updates: ${pagesToUpdate.length} of ${pageFiles.length}`);
  
  // Generate summary
  const summary = {
    totalPages: pageFiles.length,
    pagesNeedingUpdates: pagesToUpdate.length,
    alreadyUsingTreatmentImage: analysisResults.filter(r => r.treatmentImageCount > 0).length,
    totalImageComponents: analysisResults.reduce((sum, r) => sum + r.imageComponentCount, 0),
    totalTreatmentImageComponents: analysisResults.reduce((sum, r) => sum + r.treatmentImageCount, 0)
  };
  
  console.log('\nSummary:');
  console.log(`- Total treatment pages: ${summary.totalPages}`);
  console.log(`- Pages needing updates: ${summary.pagesNeedingUpdates}`);
  console.log(`- Pages already using TreatmentImage: ${summary.alreadyUsingTreatmentImage}`);
  console.log(`- Total Image components: ${summary.totalImageComponents}`);
  console.log(`- Total TreatmentImage components: ${summary.totalTreatmentImageComponents}`);
  
  // Save report to file
  const report = {
    timestamp: new Date().toISOString(),
    summary,
    pagesToUpdate: pagesToUpdate.map(p => ({
      path: p.path,
      category: p.category,
      treatment: p.treatment,
      imageCount: p.imageComponentCount,
      treatmentImageCount: p.treatmentImageCount,
      imagePaths: p.treatmentImagePaths
    }))
  };
  
  fs.writeFileSync(
    path.join(process.cwd(), 'treatment-image-update-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('\nReport saved to treatment-image-update-report.json');
}

// Run the script
updateTreatmentPages(); 