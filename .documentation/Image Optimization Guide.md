# Image Optimization Guide

This document describes the image optimization strategies implemented in the Aura Beauty website project.

## Overview

Our image optimization strategy includes:

1. **Modern Image Formats** - Using WebP and AVIF for superior compression
2. **Responsive Images** - Loading appropriate image sizes based on device and viewport
3. **Lazy Loading** - Deferring off-screen images for better initial load performance
4. **Blur Placeholders** - Showing low-quality image placeholders while images load
5. **Priority Loading** - Preloading critical images (like hero images)
6. **Content Visibility Optimization** - Using the `content-visibility` CSS property for off-screen images
7. **Error Handling & Fallbacks** - Graceful degradation when images fail to load

## Next.js Image Configuration

The project uses Next.js built-in image optimization through the `next/image` component and is configured in `next.config.js` with the following settings:

```js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 2678400, // 31 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    contentDispositionType: 'inline',
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    localPatterns: [
      {
        pathname: '/images/treatments/**',
        search: '',
      },
      {
        pathname: '/images/placeholders/**',
        search: '',
      },
      {
        pathname: '/assets/images/**',
        search: '',
      },
    ],
  },
}
```

## Enhanced TreatmentImage Component

The `TreatmentImage` component is our custom wrapper around Next.js's Image component that adds several optimization features:

```jsx
<TreatmentImage
  category="facial-treatments"
  treatment="hydrafacial"
  type="hero"
  alt="HydraFacial treatment"
  priority={true}
  className="object-cover"
/>
```

### Key Features

1. **Progressive Loading with Placeholders**
   - Generates blur placeholders for smooth loading transitions
   - Shows a placeholder while images are loading

2. **Lazy Loading with Intersection Observer**
   - Images outside the viewport are only loaded when needed
   - Uses a 200px margin to start loading just before scrolling into view

3. **Content Visibility Optimization**
   - Uses CSS `content-visibility: auto` for off-screen images
   - Helps browsers optimize rendering performance

4. **Responsive Image Sizing**
   - Automatically computes appropriate sizes based on image type
   - Provides default dimensions for different image types (hero, gallery, etc.)

5. **Error Handling & Retry Logic**
   - Automatic retry for failed images (up to 3 times)
   - Fallback to placeholder images when loading fails

6. **Priority Loading for Critical Content**
   - LCP (Largest Contentful Paint) images are set to priority loading
   - Helps improve Core Web Vitals

## Image Utility Functions

We've created several utility functions in `imageLoader.ts` to help with image optimization:

1. **imageLoader** - Custom loader for Next.js Image component
2. **getResponsiveSizes** - Returns appropriate `sizes` attribute for different image types
3. **getImageDimensions** - Provides default dimensions for different image types
4. **createBlurPlaceholder** - Generates SVG-based blur placeholders
5. **getImagePriority** - Determines loading priority based on image type

## Image Processing Scripts

The project includes several Node.js scripts for processing and optimizing images:

1. **optimize-images.js**
   - Converts JPG/PNG images to WebP and AVIF formats
   - Applies optimal compression settings
   - Handles multiple image types and sizes

2. **generate-placeholders.js**
   - Creates blur placeholder images for faster perceived loading
   - Generates tiny base64-encoded placeholders for inline use
   - Creates fallback generic placeholders

3. **analyze-images.js**
   - Analyzes image sizes and formats across the project
   - Provides optimization recommendations
   - Generates a detailed report on potential savings

## Usage Guidelines

### For Developers

1. **Always use TreatmentImage for treatment images**
   ```jsx
   <TreatmentImage
     category="body-care"
     treatment="stretch-mark"
     type="before-after"
     index={1}
     alt="Before and after stretch mark treatment"
     className="w-full h-auto"
   />
   ```

2. **Run optimization scripts after adding new images**
   ```bash
   npm run image-optimize
   ```

3. **Check optimization potential**
   ```bash
   npm run analyze-images
   ```

4. **Set `priority` for above-the-fold images only**
   - Only use the `priority` attribute for images that are visible when the page first loads
   - Typically this would be the hero image and maybe one or two other key visuals
   - Overusing priority negates its benefits

5. **Use appropriate image dimensions**
   - Don't use images larger than needed
   - Let the automatic sizing work by leveraging the proper image type

### Folder Structure

```
public/
  ├── images/
  │   ├── treatments/
  │   │   ├── facial-treatments/
  │   │   │   ├── hydrafacial/
  │   │   │   │   ├── hero.jpg
  │   │   │   │   ├── hero.webp
  │   │   │   │   ├── hero.avif
  │   │   │   │   ├── benefits-1.jpg
  │   │   │   │   └── ...
  │   │   └── ...
  │   └── placeholders/
  │       ├── facial-treatments/
  │       │   ├── hydrafacial/
  │       │   │   ├── hero-blur.jpg
  │       │   │   ├── hero-data.json
  │       │   │   └── ...
  │       └── generic/
  │           ├── hero.jpg
  │           ├── hero-blur.jpg
  │           └── ...
  └── ...
```

## Performance Impact

Our image optimization strategy provides:

- ~70-80% smaller file sizes with AVIF format
- ~50-60% smaller file sizes with WebP format
- Improved LCP scores on Core Web Vitals
- Better user experience with progressive loading
- Lower bandwidth usage for users on limited data plans

## Future Improvements

- Implement responsive art direction for different viewports
- Add automatic image cropping for different aspect ratios
- Consider server-component optimizations for Next.js App Router
- Explore CDN integration for global image delivery

## Testing

The `tests/image-optimization.spec.ts` file includes automated Playwright tests to verify:

1. Hero images load with appropriate priority
2. Gallery images use responsive sizing
3. Content visibility works for off-screen images
4. Blur placeholders show while loading
5. Modern formats (WebP/AVIF) are served when supported
6. Images have appropriate dimensions based on type

Run the tests:
```bash
npm test -- tests/image-optimization.spec.ts
```

## Best Practices

1. **Always use TreatmentImage** for treatment-related images
2. **Set `priority={true}`** for hero/above-the-fold images
3. **Run optimization scripts** after adding new images
4. **Set proper `alt` text** for accessibility
5. **Use appropriate image type** based on content
6. **Test on mobile devices** to verify responsive behavior
7. **Run Playwright tests** after changes to image components

## Troubleshooting

### Missing Images

If images don't appear:
- Check that the file exists in the correct path
- Verify that placeholder images exist
- Check for console errors related to image loading

### Slow Loading

If images load slowly:
- Run the optimization scripts to generate WebP/AVIF formats
- Check that blur placeholders are being used
- Verify that image sizes are appropriate

### Failed Tests

If image tests fail:
- Check that test images exist in the test paths
- Verify selectors are correct (especially data-testid attributes)
- Check for responsiveness issues on different viewports 