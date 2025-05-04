# TreatmentImage Component Documentation

## Overview

The `TreatmentImage` component is a standardized image component used across the site for all treatment-related images. It provides consistent image handling with automatic fallbacks to placeholder images, proper image loading, and standardized directory structure.

## Key Benefits

- **Standardized Image Handling**: Consistent approach for all treatment images
- **Automatic Fallbacks**: Falls back to placeholder images when actual images are not available
- **Standardized Directory Structure**: Enforces a consistent image organization pattern
- **Image Type Categorization**: Supports different image types (hero, benefits, etc.)
- **Next.js Image Integration**: Uses Next.js Image component for optimization

## Props

| Prop       | Type     | Required | Default   | Description                                                        |
|------------|----------|----------|-----------|-------------------------------------------------------------------|
| `category` | string   | Yes      | -         | Category of treatment (e.g., 'facial-treatments', 'new-doublo')    |
| `treatment`| string   | Yes      | -         | Specific treatment slug (e.g., 'smart-rescue', 'laser-treatment')  |
| `type`     | enum     | Yes      | -         | Image type (see below for valid types)                             |
| `index`    | number   | No       | 0         | Index for multiple images of the same type                         |
| `alt`      | string   | Yes      | -         | Alt text for the image (important for accessibility)               |
| `className`| string   | No       | ''        | CSS class(es) for the image element                                |
| `fill`     | boolean  | No       | false     | Whether to use fill mode (use with relative parent container)      |
| `width`    | number   | No       | 800       | Width of the image (unused if fill=true)                           |
| `height`   | number   | No       | 600       | Height of the image (unused if fill=true)                          |
| `priority` | boolean  | No       | false     | Whether to prioritize loading (for hero images/above the fold)     |

### Valid Image Types

The `type` prop must be one of the following values:

- `hero`: Main hero image for the treatment
- `how-it-works`: Images showing the treatment process
- `benefits`: Images showcasing treatment benefits
- `results`: Before/after or results images
- `testimonial`: Images for testimonials
- `gallery`: General gallery images
- `technology`: Images of the technology/equipment
- `comparison`: Comparison images between treatments/options
- `before-after`: Before and after images

## Directory Structure

The component expects images to follow this directory structure:

```
public/
├── images/
│   ├── treatments/
│   │   ├── [category]/
│   │   │   ├── [treatment]/
│   │   │   │   ├── hero.jpg
│   │   │   │   ├── benefits-1.jpg
│   │   │   │   ├── benefits-2.jpg
│   │   │   │   ├── how-it-works-1.jpg
│   │   │   │   ├── how-it-works-2.jpg
│   │   │   │   └── ...
│   ├── placeholders/
│   │   ├── [category]/
│   │   │   ├── [treatment]/
│   │   │   │   ├── hero.jpg
│   │   │   │   ├── benefits.jpg
│   │   │   │   ├── how-it-works.jpg
│   │   │   │   └── ...
```

## Fallback Images

The component automatically handles missing images by displaying placeholders. Placeholder images should be placed at:

```
/public/images/placeholders/[category]/[type].jpg
```

For example, a placeholder for a facial treatment hero image would be at:
```
/public/images/placeholders/facial-treatments/hero.jpg
```

## Usage Examples

### Hero Image (with fill)

```jsx
<div className="relative h-[500px] rounded-lg overflow-hidden">
  <TreatmentImage 
    category="facial-treatments"
    treatment="smart-rescue"
    type="hero"
    alt="360° Smart Rescue Treatment"
    fill
    className="object-cover w-full h-full"
    priority
  />
</div>
```

### Benefits Image with Index (Multiple Images)

```jsx
<div className="aspect-square relative">
  <TreatmentImage 
    category="facial-treatments"
    treatment="smart-rescue"
    type="benefits"
    index={1}
    alt="Treatment Benefits"
    fill
    className="object-cover w-full h-full"
  />
</div>
```

### Fixed Width/Height Image

```jsx
<TreatmentImage 
  category="new-doublo"
  treatment="sculpt-lift"
  type="technology"
  alt="Sculpt & Lift Technology"
  width={400}
  height={300}
  className="rounded-md"
/>
```

## Creating New Treatment Images

When adding images for a new treatment:

1. Create the appropriate directory structure:
   ```bash
   mkdir -p public/images/treatments/[category]/[treatment]/{hero,benefits,how-it-works,results}
   ```

2. Create placeholder structure:
   ```bash
   mkdir -p public/images/placeholders/[category]/[treatment]
   ```

3. Add placeholder images:
   ```bash
   cp public/images/placeholders/treatment-1.jpg public/images/placeholders/[category]/[treatment]/hero.jpg
   cp public/images/placeholders/treatment-2.jpg public/images/placeholders/[category]/[treatment]/benefits.jpg
   # etc.
   ```

4. Replace placeholders with actual images when available.

## Implementation Details

The component leverages Next.js Image component for optimization, but adds several features:

1. **Automatic path detection**: Constructs the correct path based on category, treatment, and type
2. **Image Fallbacks**: Automatically falls back to placeholder if the image isn't found
3. **Cache Management**: Includes timestamp-based cache busting for updated images

## Best Practices

- Always provide a descriptive `alt` text for accessibility
- Use `fill` mode with a parent container that has position relative and defined dimensions
- Use `priority` for above-the-fold images that are critical for LCP (Largest Contentful Paint)
- Keep images optimized and appropriately sized for their display requirements
- Create all required directory structures when adding a new treatment
- Add placeholder images for all common image types 