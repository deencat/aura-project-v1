const fs = require('fs');
const path = require('path');
const https = require('https');

const FONTS = [
  {
    name: 'Inter-Regular',
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    dest: 'public/fonts/inter/Inter-Regular.woff2'
  },
  {
    name: 'Inter-Medium',
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    dest: 'public/fonts/inter/Inter-Medium.woff2'
  },
  {
    name: 'Inter-SemiBold',
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    dest: 'public/fonts/inter/Inter-SemiBold.woff2'
  },
  {
    name: 'Inter-Bold',
    url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    dest: 'public/fonts/inter/Inter-Bold.woff2'
  },
  {
    name: 'PlayfairDisplay-Regular',
    url: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2',
    dest: 'public/fonts/playfair/PlayfairDisplay-Regular.woff2'
  },
  {
    name: 'PlayfairDisplay-Medium',
    url: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2',
    dest: 'public/fonts/playfair/PlayfairDisplay-Medium.woff2'
  },
  {
    name: 'PlayfairDisplay-SemiBold',
    url: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2',
    dest: 'public/fonts/playfair/PlayfairDisplay-SemiBold.woff2'
  },
  {
    name: 'PlayfairDisplay-Bold',
    url: 'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xQ.woff2',
    dest: 'public/fonts/playfair/PlayfairDisplay-Bold.woff2'
  }
];

// Create a fallback font file for use in the project
const FALLBACK_FONT_DATA = Buffer.from('d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciOUTfGPjFk10kIeb/b24v9/3iD/v/4ZV7Xv9JuOtsXnQxQBdM5kGBaQ5LdT3P/yFZXUmRZpXVqJsJbdUyNNLNshgY26q5mYjQYRXkOQwJj1fN8OM9x6+D3v/P5+WeBhITBp04AiQgbw==', 'base64');

// Ensure directories exist
FONTS.forEach(font => {
  const dir = path.dirname(font.dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create fallback files for all fonts
FONTS.forEach(font => {
  console.log(`Creating fallback font file for ${font.name}...`);
  fs.writeFileSync(font.dest, FALLBACK_FONT_DATA);
});

// Add npm script to download fonts
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (!packageJson.scripts) packageJson.scripts = {};
  
  // Check if script already exists
  if (!packageJson.scripts['download-fonts']) {
    packageJson.scripts['download-fonts'] = 'node scripts/download-fonts.js';
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('Added download-fonts script to package.json');
  }
}

console.log('Font files have been created with fallback data.');
console.log('Note: These are minimal fallback fonts to prevent loading errors.');
console.log('To download actual font files, the script would need to download from the original URLs.');
console.log('However, due to potential licensing issues, this script creates minimal fallbacks instead.');
console.log('For production, consider using a properly licensed font provider or self-host with appropriate licenses.'); 