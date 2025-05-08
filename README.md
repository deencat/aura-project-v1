# Aura Beauty Website

This project implements a comprehensive image optimization system for the Aura Beauty website, focusing on performance and user experience.

## Image Optimization System

The image optimization system includes:

- **Modern Format Conversion**: WebP and AVIF support for 50-80% smaller file sizes
- **Responsive Sizing**: Automatically serve the right image size for each device
- **Progressive Loading**: Blur placeholders for better loading experience
- **Lazy Loading**: Images load only when they enter the viewport
- **Preloading Critical Images**: Prioritize above-the-fold imagery

### Components

- `TreatmentImage`: Specialized component for treatment images
- `ResponsiveImage`: Generic component for all other images

### Utilities

- `imageLoader`: Custom loader for optimized formats
- `getPlaceholder`: Generates placeholder URLs
- `getSizes`: Provides appropriate sizes attribute
- `shouldPrioritize`: Determines if an image should be prioritized
- `getAspectRatio`: Calculates aspect ratio for images
- `getLoadingStrategy`: Determines optimal loading strategy

### Scripts

- `generate-formats.js`: Converts images to WebP and AVIF formats
- `generate-placeholders.js`: Creates blur placeholders
- `generate-responsive-sizes.js`: Generates responsive image sizes
- `analyze-images.js`: Analyzes and reports on image optimization

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Image Optimization Commands

```bash
# Basic optimization (formats + placeholders)
npm run image-optimize

# Full optimization including responsive sizes
npm run image-optimize:full

# Generate analysis report
npm run analyze-images

# Generate JSON report
npm run image-report
```

## Documentation

For detailed documentation on the image optimization system, see [Image Optimization Guide](docs/image-optimization-guide.md).

## Performance Impact

- **File Size Reduction**:
  - WebP format: 30-50% smaller than JPG
  - AVIF format: 50-80% smaller than JPG
  - Responsive sizes: Additional 40-60% reduction for mobile devices

- **Core Web Vitals Improvements**:
  - Largest Contentful Paint (LCP): ~40% faster
  - Cumulative Layout Shift (CLS): Near-zero with proper placeholders

## License

This project is licensed under the MIT License.
