# TreatmentImage Component Documentation

## Overview
The `TreatmentImage` component is a standardized wrapper around Next.js Image component that provides consistent image handling across the Aura Beauty website. It implements a consistent directory structure for treatment images, automatic fallback to placeholder images, and proper alt text handling for accessibility.

## Key Features
- **Consistent image handling**: Standardized approach for all treatment-related images
- **Directory structure**: Organized image storage following a clear pattern
- **Automatic fallbacks**: Graceful degradation with placeholder images
- **Accessibility**: Proper alt text support
- **Responsive design**: Support for various image display methods (fill, width/height)

## Component Location
`/src/components/TreatmentImage.tsx`

## Props Interface

```tsx
interface TreatmentImageProps {
  category: string;          // Category folder (e.g., 'facial-treatments', 'new-doublo')
  treatment: string;         // Treatment subfolder (e.g., 'collagen-regeneration', 'v-line')
  type: 'hero' | 'how-it-works' | 'benefits' | 'results' | 'testimonial' | 'gallery' | 'technology' | 'comparison' | 'before-after';
  index?: number;            // Optional: For multiple images of same type
  alt: string;               // Required for accessibility
  className?: string;        // Optional: Add custom styling
  fill?: boolean;            // Optional: Fill parent container
  width?: number;            // Optional: Set specific width
  height?: number;           // Optional: Set specific height
  priority?: boolean;        // Optional: For LCP images
  quality?: number;          // Optional: Image quality (default: 80)
  sizes?: string;            // Optional: Responsive sizes attribute
}
```

## Directory Structure

Images are stored in a consistent directory structure:
- Treatment images: `/public/images/treatments/{category}/{treatment}/{type}(-{index}).jpg`
- Fallbacks: `/public/images/placeholders/{category}/{type}.jpg`

### Example Paths
- `/public/images/treatments/facial-treatments/collagen-regeneration/hero.jpg`
- `/public/images/treatments/new-doublo/v-line/testimonial-2.jpg`
- `/public/images/placeholders/facial-treatments/gallery.jpg`

## Image Types

| Type | Description | Example Usage |
|------|-------------|---------------|
| `hero` | Main treatment image for hero sections | Page headers |
| `gallery` | Treatment process or results gallery images | Image carousels |
| `benefits` | Images highlighting treatment benefits | Benefits sections | 
| `technology` | Images showcasing treatment technology | Technology explanations |
| `testimonial` | Client testimonial avatars | Testimonial sections |
| `before-after` | Before/after comparison images | Results demonstrations |
| `how-it-works` | Treatment process explanation images | Treatment procedures |
| `results` | Treatment results showcase images | Results sections |
| `comparison` | Side-by-side comparison images | Technology comparisons |

## Usage Examples

### Basic Usage
```tsx
<TreatmentImage
  category="facial-treatments"
  treatment="collagen-regeneration"
  type="hero"
  alt="Collagen Regeneration Treatment"
  priority
/>
```

### Gallery Image with Index
```tsx
<TreatmentImage
  category="new-doublo"
  treatment="v-line"
  type="gallery"
  index={2}
  alt="V-Line treatment process - step 2"
  width={500}
  height={300}
/>
```

### Filling a Container
```tsx
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <TreatmentImage
    category="body-care"
    treatment="lymphatic-detox"
    type="hero"
    alt="Lymphatic Detox treatment overview"
    fill
    className="object-cover"
  />
</div>
```

### Testimonial Avatar
```tsx
<TreatmentImage
  category="new-doublo"
  treatment="youth-revival"
  type="testimonial"
  index={1}
  alt="Client testimonial"
  width={64}
  height={64}
  className="rounded-full"
/>
```

## Implementation Details

The component handles the following:

1. **Path Construction**: Builds the correct path based on category, treatment, type, and index
2. **Error Handling**: Gracefully handles missing images with appropriate fallbacks
3. **Responsive Support**: Allows both fixed size and container-filling approaches
4. **Priority Loading**: Supports priority loading for LCP (Largest Contentful Paint) images
5. **Custom Styling**: Allows for custom class names for additional styling
6. **Optimized Loading**: Implements blur placeholders and responsive sizing
7. **Type-Specific Defaults**: Provides smart defaults for dimensions and sizes based on image type
8. **Automatic LCP Optimization**: Hero images are automatically prioritized for better performance

## Fallback Mechanism

The component uses a multi-tiered fallback approach:
1. First tries to load the specified image
2. If not found, tries to load the fallback image from the placeholders directory
3. If that fails, displays the PlaceholderImage component
4. Uses blur placeholders for improved loading experience

## Special Cases

### Youth Revival Video
For the youth-revival service's hero image, the component checks if this is the requested image and returns a video instead:

```tsx
if (type === 'hero' && category === 'new-doublo' && treatment === 'youth-revival') {
  path = `/images/treatments/${category}/${treatment}/${type}.mp4`;
}
```

### Type-Specific Sizing
The component implements smart defaults for different image types:

```tsx
const defaultSizes = {
  'hero': '100vw',
  'gallery': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  'benefits': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  'results': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
  'testimonial': '96px',
  'technology': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw',
  'before-after': '(max-width: 640px) 100vw, 50vw',
  'comparison': '(max-width: 640px) 100vw, 50vw',
  'how-it-works': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
}[type];
```

Default dimensions are also provided for each type:

```tsx
const defaults = {
  'hero': { width: 1920, height: 1080 },
  'gallery': { width: 800, height: 600 },
  'benefits': { width: 600, height: 600 },
  'results': { width: 800, height: 800 },
  'testimonial': { width: 128, height: 128 },
  'technology': { width: 600, height: 400 },
  'before-after': { width: 800, height: 600 },
  'comparison': { width: 800, height: 500 },
  'how-it-works': { width: 600, height: 400 }
}[type];
```

### Blur Placeholders
The component now supports blur placeholders for improved loading experience:

```tsx
// Generate blur placeholder for non-hero images (smaller file size)
if (type !== 'hero' && !['new-doublo', 'youth-revival'].includes(treatment)) {
  setBlurDataUrl(`/images/placeholders/${category}/${type}-blur.jpg`);
}
```

## Best Practices

1. **Always provide alt text**: This is essential for accessibility and SEO
2. **Use appropriate image type**: Select the correct type based on the image's purpose
3. **Set priority for hero images**: Use `priority` prop for above-the-fold images (now automatic for hero type)
4. **Create placeholder fallbacks**: Ensure placeholder images exist for each category/type
5. **Create blur placeholders**: Run the `npm run generate-blur` script to create blur placeholders
6. **Use standardized dimensions**: Maintain consistent aspect ratios for similar image types
7. **Let the component handle sizes**: The component provides optimal responsive size settings by default
8. **Optimize image content**: Compress and properly size images before adding to public directory
9. **Consider quality settings**: Use the quality prop to adjust image quality for specific cases

## Testing

When writing Playwright tests for components using TreatmentImage:
1. Focus on testing visible content rather than specific image URLs
2. Check for the presence of images but not necessarily the exact paths
3. Make tests resilient to image loading variations
4. Consider using role-based selectors rather than direct image selectors
5. Test for the presence of optimization attributes like `sizes` and `loading`

Example test snippet:
```tsx
// Check for TreatmentImage components
const heroImage = page.locator('main img').first();
await expect(heroImage).toBeVisible();

// Verify optimization attributes
const sizesAttr = await heroImage.getAttribute('sizes');
expect(sizesAttr).toBeTruthy();

// Verify an appropriate number of gallery images
const galleryImages = page.locator('.gallery-section img');
await expect(galleryImages).toHaveCount(4);
```

## Performance Optimization

The enhanced TreatmentImage component implements several performance best practices:

1. **WebP and AVIF support**: Modern image formats configured in next.config.js
2. **Responsive sizing**: Smart defaults for the `sizes` attribute based on image type
3. **Automatic prioritization**: Hero images are automatically prioritized
4. **Blur placeholders**: Tiny, blurred versions of images shown during loading
5. **Lazy loading**: Non-priority images are lazy-loaded
6. **Quality settings**: Default quality of 80 with option to override
7. **Appropriate dimensions**: Type-specific default dimensions
8. **Smart caching**: 30-day minimum cache TTL configured in next.config.js

To generate blur placeholders for improved loading experience:

```bash
npm run generate-blur
```

This script creates tiny, blurred versions of placeholder images that provide a visual preview while the full image loads.

## Troubleshooting

### Common Issues

1. **Image not showing**: 
   - Check if the file exists at the expected path
   - Verify the directory structure follows the convention
   - Ensure placeholder images are available
   - Run the blur placeholder generator script

2. **Wrong image dimensions**:
   - Explicitly set width and height, or
   - Use fill with appropriate parent container styling
   - Let the component use its smart defaults

3. **Unoptimized warning**:
   - Make sure the image is properly formatted
   - Verify next.config.js has proper image optimization settings
   - Use the sizes prop provided by the component

4. **Test failures**:
   - Use more resilient selectors
   - Add appropriate wait conditions
   - Test for visibility rather than specific attributes
   - Check for optimization attributes without assuming specific values 