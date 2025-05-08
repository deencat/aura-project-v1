# Image Optimization Guide for Aura Beauty

This guide documents the image optimization system implemented in the Aura Beauty website project. It covers usage of optimization tools, implementation of responsive image components, and best practices to achieve optimal performance.

## Table of Contents

1. [Overview](#overview)
2. [Optimization Tools](#optimization-tools)
3. [Image Components](#image-components)
4. [Usage Guidelines](#usage-guidelines)
5. [Performance Impact](#performance-impact)
6. [Troubleshooting](#troubleshooting)

## Overview

The Aura Beauty image optimization system focuses on several key areas:

- **Modern formats**: Converting images to WebP and AVIF formats for ~70% size reduction
- **Responsive sizing**: Serving the right image size based on viewport
- **Progressive loading**: Using blur placeholders for a better loading experience
- **Lazy loading**: Only loading images when they come into viewport
- **Preloading critical images**: Prioritizing above-the-fold imagery

These techniques together help improve:
- Core Web Vitals scores (LCP, CLS)
- Page load times
- Data usage for users
- Overall user experience

## Optimization Tools

The project includes several scripts for image optimization. All scripts can be found in the `scripts/image-processing/` directory.

### Format Generation

Converts images to modern WebP and AVIF formats while maintaining quality.

```bash
# Basic usage - process all images
npm run optimize-images

# Verbose mode for detailed logs
npm run optimize-images:verbose

# Force regeneration of all formats
npm run optimize-images:force

# Process specific directory
npm run optimize-images -- --dir=treatments

# Custom quality setting (default: 75)
npm run optimize-images -- --quality=80
```

### Placeholder Generation

Creates tiny, blurred versions of images to use as placeholders during loading.

```bash
# Generate all placeholders
npm run generate-placeholders

# Force regeneration
npm run generate-placeholders:force

# Custom settings
npm run generate-placeholders -- --size=30 --blur=15 --quality=50
```

### Responsive Size Generation

Creates multiple sizes of each image for responsive serving.

```bash
# Generate responsive sizes
npm run generate-responsive

# Force regeneration
npm run generate-responsive:force

# Custom sizes
npm run generate-responsive -- --sizes=400,800,1200,1600
```

### Image Analysis

Analyzes the project's images and provides optimization reports.

```bash
# Generate analysis report
npm run analyze-images

# Detailed report
npm run analyze-images:verbose

# Output as JSON file
npm run image-report

# Only show images missing optimizations
npm run analyze-images -- --missing-only
```

### Complete Optimization

For convenience, there are combined scripts:

```bash
# Basic optimization (formats + placeholders)
npm run image-optimize

# Full optimization including responsive sizes
npm run image-optimize:full
```

## Image Components

### TreatmentImage Component

The `TreatmentImage` component should be used for all treatment images in the application. It handles:

- Automatic format selection based on browser support
- Responsive sizing
- Lazy loading with Intersection Observer
- Blur placeholders
- Error handling

Example usage:

```jsx
import TreatmentImage from '@/components/ui/TreatmentImage';

// Basic usage
<TreatmentImage 
  src="/images/treatments/facial.jpg"
  alt="Luxury Facial Treatment"
  width={800}
  height={600}
/>

// With priority (for above-the-fold images)
<TreatmentImage 
  src="/images/treatments/facial.jpg"
  alt="Luxury Facial Treatment"
  width={800}
  height={600}
  priority={true}
/>

// With custom placeholder
<TreatmentImage 
  src="/images/treatments/facial.jpg"
  alt="Luxury Facial Treatment"
  width={800}
  height={600}
  placeholder="data:image/jpeg;base64,/9j/2wCEAA..."
/>
```

### ResponsiveImage Component

A more generic component for all other images, with similar features.

```jsx
import ResponsiveImage from '@/components/ui/ResponsiveImage';

<ResponsiveImage 
  src="/images/banner.jpg"
  alt="Welcome Banner"
  width={1200}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## Usage Guidelines

### When to Use Each Component

- **TreatmentImage**: For all treatment-related imagery
- **ResponsiveImage**: For general website imagery (banners, backgrounds, etc.)
- **Next/Image**: For UI elements or when you need direct control

### Image Preparation

1. Start with high-quality source images (JPG or PNG)
2. Place them in the `public/images/` directory in the appropriate subfolder
3. Run the optimization scripts:
   ```bash
   npm run image-optimize:full
   ```
4. Use the generated formats in your components

### Priority Images

For images that appear above-the-fold or are critical for user experience:

1. Set `priority={true}` when using the components
2. This will preload the image and avoid layout shifts

### Responsive Sizing

Use the `sizes` attribute to help the browser select the right image size:

```jsx
<TreatmentImage 
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  // other props...
/>
```

Common size patterns:
- Full-width image: `"100vw"`
- Two-column layout: `"(max-width: 768px) 100vw, 50vw"`
- Three-column layout: `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`

## Performance Impact

Based on our measurements:

- **File Size Reduction**:
  - WebP format: 30-50% smaller than JPG
  - AVIF format: 50-80% smaller than JPG
  - Responsive sizes: Additional 40-60% reduction for mobile devices

- **Core Web Vitals Improvements**:
  - Largest Contentful Paint (LCP): ~40% faster
  - Cumulative Layout Shift (CLS): Near-zero with proper placeholders
  - First Input Delay (FID): Minimal impact (primarily affects JavaScript)

- **Data Usage**:
  - Mobile: ~60-80% less data transferred for images
  - Desktop: ~40-60% less data transferred for images

## Troubleshooting

### Missing Optimized Formats

If you see the original format loading instead of WebP/AVIF:

1. Run the analysis to check for missing formats:
   ```bash
   npm run analyze-images -- --missing-only
   ```
2. Regenerate the missing formats:
   ```bash
   npm run optimize-images:force
   ```

### Blurry Images

If images appear blurry on high-DPI displays:

1. Check that proper responsive sizes are generated
2. Ensure the `sizes` attribute correctly represents the image display size
3. For critical images, consider using larger sizes or setting `quality` higher

### Layout Shifts

If you experience Cumulative Layout Shift (CLS) issues:

1. Always include `width` and `height` props matching the image aspect ratio
2. Use the blur placeholder to reserve space during loading
3. For above-the-fold images, use `priority={true}`

### Build Errors

If you encounter build errors related to images:

1. Ensure all required formats exist
2. Check that the image paths in your components are correct
3. Verify that image dimensions are properly specified

### Script Performance

If optimization scripts are running slowly:

1. Process specific directories rather than all images
2. Adjust the quality settings for faster processing
3. Consider reducing the effort level for AVIF generation

---

For additional help or to suggest improvements to the image optimization system, please contact the development team. 