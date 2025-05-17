# Components Documentation

## TreatmentImage Component

The `TreatmentImage` component is a standardized way to display treatment-related images across the site. It handles image loading, fallbacks, and consistent styling.

### Usage

```tsx
import TreatmentImage from '@/components/TreatmentImage';

// Basic usage
<TreatmentImage 
  category="facials" 
  treatment="glow" 
  type="hero" 
  alt="Glow Facial Treatment" 
/>

// With additional options
<TreatmentImage 
  category="new-doublo" 
  treatment="youth-revival" 
  type="benefits" 
  index={1}
  alt="Youth Revival Benefits" 
  width={600}
  height={400}
  priority
  quality={90}
  objectFit="cover"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `category` | string | (required) | Treatment category (e.g., 'facials', 'body-care', 'new-doublo') |
| `treatment` | string | (required) | Treatment name/slug (e.g., 'glow', 'hair-removal') |
| `type` | string | (required) | Image type ('hero', 'how-it-works', 'benefits', etc.) |
| `index` | number | 0 | Index for multiple images of the same type (e.g., benefits-1, benefits-2) |
| `alt` | string | (required) | Alt text for accessibility |
| `className` | string | '' | Additional CSS classes |
| `fill` | boolean | false | Whether to use Next.js Image fill mode |
| `width` | number | 800 | Image width |
| `height` | number | 600 | Image height |
| `priority` | boolean | false | Whether to prioritize loading |
| `quality` | number | 80 | Image quality (1-100) |
| `sizes` | string | undefined | Sizes attribute for responsive images |
| `fallbackBehavior` | 'placeholder' \| 'generic' \| 'none' | 'placeholder' | How to handle missing images |
| `objectFit` | 'cover' \| 'contain' \| 'fill' \| 'none' | 'cover' | Object-fit style for the image |
| `refreshOnError` | boolean | false | Whether to attempt to refresh the image cache on error |

### Image Path Structure

The component follows a standardized path structure:

```
/images/treatments/{category}/{treatment}/{type}-{index}.jpg
```

For example:
- `/images/treatments/facials/glow/hero.jpg`
- `/images/treatments/body-care/hair-removal/benefits-1.jpg`
- `/images/treatments/new-doublo/youth-revival/how-it-works-2.jpg`

### Fallback Behavior

When an image fails to load, the component will:

1. Try to load from the standardized path
2. If that fails, use a fallback based on the `fallbackBehavior` prop:
   - `'placeholder'`: Use the PlaceholderImage component
   - `'generic'`: Use a generic image from `/images/placeholders/{category}/{type}.jpg`
   - `'none'`: Render nothing

### Scripts for Standardization

Several scripts are available to help standardize image usage:

- `src/scripts/generate-placeholders.js`: Generate placeholder images for all categories and types
- `src/scripts/standardize-image-paths.js`: Create proper directory structure for all treatments
- `src/scripts/update-treatment-pages.js`: Analyze pages to identify where TreatmentImage should be used

Run these scripts with:

```bash
node src/scripts/generate-placeholders.js
node src/scripts/standardize-image-paths.js
node src/scripts/update-treatment-pages.js
```

## PlaceholderImage Component

The `PlaceholderImage` component is used to display styled placeholders when actual images are not available. It's used internally by TreatmentImage but can also be used directly.

### Usage

```tsx
import PlaceholderImage from '@/components/PlaceholderImage';

<PlaceholderImage 
  className="rounded-lg" 
  aspectRatio="aspect-video" 
  imageUrl="/images/placeholders/facials/hero.jpg"
/>
```

For more details, see the PlaceholderImage component documentation. 