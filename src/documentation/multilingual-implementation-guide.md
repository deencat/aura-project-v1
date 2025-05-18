# Multilingual Implementation Guide

This guide documents the multilingual implementation in the Aura Beauty project, covering services, blog posts, and testimonials.

## Table of Contents

1. [Overview](#overview)
2. [Data Structure](#data-structure)
3. [Components](#components)
4. [Language Context](#language-context)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)
7. [File Structure](#file-structure)

## Overview

The Aura Beauty project supports multiple languages (English, Traditional Chinese, and Simplified Chinese) for various content types:

- **Services**: Treatment descriptions, details, and benefits
- **Blog Posts**: Titles, content, and meta descriptions
- **Testimonials**: Client names and testimonial content

The multilingual system uses React Context to manage language selection and provides specialized components to display content in the user's preferred language.

## Data Structure

### Services

```typescript
interface Service {
  id: number;
  name: string;
  slug: string;
  // ... other fields
  multilingual: {
    english: {
      name: string;
      description: string;
      benefits: string[];
    };
    traditional_chinese: {
      name: string;
      description: string;
      benefits: string[];
    };
    simplified_chinese: {
      name: string;
      description: string;
      benefits: string[];
    };
  };
}
```

### Blog Posts

```typescript
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  // ... other fields
  multilingual: {
    english: {
      title: string;
      content: string;
      metaDescription: string;
    };
    traditional_chinese: {
      title: string;
      content: string;
      metaDescription: string;
    };
    simplified_chinese: {
      title: string;
      content: string;
      metaDescription: string;
    };
  };
}
```

### Testimonials

```typescript
interface Testimonial {
  id: number;
  clientName: string;
  content: string;
  // ... other fields
  multilingual: {
    english: {
      clientName: string;
      content: string;
    };
    traditional_chinese: {
      clientName: string;
      content: string;
    };
    simplified_chinese: {
      clientName: string;
      content: string;
    };
  };
}
```

## Components

### LocalizedServiceContent

Displays service content in the user's selected language.

```tsx
<LocalizedServiceContent service={service} field="name" />
<LocalizedServiceContent service={service} field="description" />
```

### LocalizedBlogContent

Displays blog post content in the user's selected language.

```tsx
<LocalizedBlogContent post={blogPost} field="title" />
<LocalizedBlogContent post={blogPost} field="content" />
<LocalizedBlogContent post={blogPost} field="metaDescription" />
```

### LocalizedTestimonialContent

Displays testimonial content in the user's selected language.

```tsx
<LocalizedTestimonialContent testimonial={testimonial} field="clientName" />
<LocalizedTestimonialContent testimonial={testimonial} field="content" />
```

## Language Context

The `LanguageContext` provides language selection and translation functionality:

```tsx
const { language, setLanguage, t } = useLanguage();
```

- `language`: Current language ('en', 'zh-TW', 'zh-CN')
- `setLanguage`: Function to change the current language
- `t`: Translation function for UI elements

## Usage Examples

### Service Page

```tsx
import { LocalizedServiceContent } from '@/components/LocalizedServiceContent';

export default function ServicePage({ service }) {
  return (
    <div>
      <h1><LocalizedServiceContent service={service} field="name" /></h1>
      <p><LocalizedServiceContent service={service} field="description" /></p>
      <ul>
        {service.multilingual.english.benefits.map((_, index) => (
          <li key={index}>
            <LocalizedServiceContent service={service} field="benefits" index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Blog Post Page

```tsx
import { LocalizedBlogContent } from '@/components/LocalizedBlogContent';

export default function BlogPostPage({ post }) {
  return (
    <article>
      <h1><LocalizedBlogContent post={post} field="title" /></h1>
      <div className="content">
        <LocalizedBlogContent post={post} field="content" />
      </div>
    </article>
  );
}
```

### Testimonial Component

```tsx
import { LocalizedTestimonialContent } from '@/components/LocalizedTestimonialContent';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <p className="content">
        <LocalizedTestimonialContent testimonial={testimonial} field="content" />
      </p>
      <p className="author">
        - <LocalizedTestimonialContent testimonial={testimonial} field="clientName" />
      </p>
    </div>
  );
}
```

### Homepage with Multilingual Content

The homepage showcases both multilingual blog posts and testimonials:

```tsx
import { LocalizedBlogContent } from '@/components/LocalizedBlogContent';
import { TestimonialSection } from '@/components/TestimonialSection';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <main>
      {/* Other sections */}
      
      {/* Featured blog posts section */}
      <section>
        <h2>{t('latest_from_blog', 'Latest From Our Blog')}</h2>
        
        <div className="blog-grid">
          {featuredBlogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <h3><LocalizedBlogContent post={post} field="title" /></h3>
              <div className="excerpt">
                <LocalizedBlogContent post={post} field="content" />
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Testimonials section */}
      <section>
        <h2>{t('what_clients_say', 'What Our Clients Say')}</h2>
        <TestimonialSection testimonials={featuredTestimonials} />
      </section>
    </main>
  );
}
```

## Best Practices

1. **Always provide fallbacks**: Ensure all language variants have content, with English as the default fallback.

2. **Use the LocalizedContent components**: These handle language selection and fallbacks automatically.

3. **Keep translations consistent**: Maintain consistent terminology across all languages.

4. **Test with different languages**: Regularly test the UI with all supported languages.

5. **Consider text expansion**: Some languages may require more space than others.

6. **Separate UI text from content**: Use the `t()` function for UI elements and the `LocalizedContent` components for dynamic content.

7. **Update all languages simultaneously**: When adding new content, update all language variants at the same time.

## File Structure

```
src/
├── components/
│   ├── LanguageSwitcher.tsx
│   ├── LocalizedServiceContent.tsx
│   ├── LocalizedBlogContent.tsx
│   ├── LocalizedTestimonialContent.tsx
│   └── TestimonialCard.tsx
├── contexts/
│   └── LanguageContext.tsx
├── utils/
│   ├── serviceUtils.ts
│   ├── blogUtils.ts
│   └── testimonialUtils.ts
└── app/
    ├── blog/
    │   ├── page.tsx
    │   └── [slug]/
    │       └── page.tsx
    ├── testimonials/
    │   └── page.tsx
    └── admin/
        ├── blog/
        │   ├── new/
        │   │   └── page.tsx
        │   └── edit/
        │       └── [id]/
        │           └── page.tsx
        └── testimonials/
            ├── new/
            │   └── page.tsx
            └── edit/
                └── [id]/
                    └── page.tsx
``` 