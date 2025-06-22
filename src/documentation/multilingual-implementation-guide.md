# Multilingual Implementation Guide for Aura Beauty

This guide outlines the steps to implement multilingual support across the Aura Beauty website, allowing content to be displayed in English, Traditional Chinese, and Simplified Chinese.

## Overview

The multilingual system consists of:

1. **LanguageSwitcher Component**: UI element for users to change their language preference
2. **LanguageContext Provider**: Context for storing and accessing the current language
3. **Localized Content Components**: Components for displaying content in the selected language
   - LocalizedServiceContent: For service-related content
   - LocalizedBlogContent: For blog post content
   - LocalizedTestimonialContent: For testimonial content
4. **Translation Keys**: Common UI elements and text stored in the LanguageContext
5. **Multilingual Data Structure**: Format for storing multilingual content in data objects
6. **Integrated Components**: Components that combine multilingual content types (e.g., FeaturedContent)

## Implementation Steps

### 1. Add Multilingual Data to Content Objects

Update data objects to include multilingual content:

#### Service Data Example:

```typescript
const serviceData = {
  id: 101,
  name: 'Service Name in English',
  short_description: 'Description in English',
  // other fields...
  
  // Add multilingual data
  multilingual: {
    english: {
      name: 'Service Name in English',
      short_description: 'Description in English',
      // other fields...
    },
    traditional_chinese: {
      name: '服務名稱 (繁體中文)',
      short_description: '繁體中文描述',
      // other fields...
    },
    simplified_chinese: {
      name: '服务名称 (简体中文)',
      short_description: '简体中文描述',
      // other fields...
    }
  }
}
```

#### Blog Post Example:

```typescript
const blogPost = {
  id: 201,
  title: 'Blog Title in English',
  content: 'Content in English',
  metaDescription: 'Meta description in English',
  // other fields...
  
  // Add multilingual data
  multilingual: {
    english: {
      title: 'Blog Title in English',
      content: 'Content in English',
      metaDescription: 'Meta description in English'
    },
    traditional_chinese: {
      title: '博客標題 (繁體中文)',
      content: '繁體中文內容',
      metaDescription: '繁體中文元描述'
    },
    simplified_chinese: {
      title: '博客标题 (简体中文)',
      content: '简体中文内容',
      metaDescription: '简体中文元描述'
    }
  }
}
```

#### Testimonial Example:

```typescript
const testimonial = {
  id: 301,
  clientName: 'Client Name in English',
  content: 'Testimonial content in English',
  // other fields...
  
  // Add multilingual data
  multilingual: {
    english: {
      clientName: 'Client Name in English',
      content: 'Testimonial content in English'
    },
    traditional_chinese: {
      clientName: '客戶名稱 (繁體中文)',
      content: '繁體中文評價內容'
    },
    simplified_chinese: {
      clientName: '客户名称 (简体中文)',
      content: '简体中文评价内容'
    }
  }
}
```

### 2. Update Content Display Components

Replace direct text references with the appropriate localized content component:

#### Service Content:

```tsx
// Before
<h1>{service.name}</h1>
<p>{service.short_description}</p>

// After
<h1><LocalizedServiceContent service={service} field="name" /></h1>
<p><LocalizedServiceContent service={service} field="short_description" /></p>
```

#### Blog Content:

```tsx
// Before
<h1>{post.title}</h1>
<div>{post.content}</div>

// After
<h1><LocalizedBlogContent post={post} field="title" /></h1>
<div><LocalizedBlogContent post={post} field="content" dangerouslySetInnerHTML={true} /></div>
```

#### Testimonial Content:

```tsx
// Before
<p className="font-bold">{testimonial.clientName}</p>
<p className="italic">{testimonial.content}</p>

// After
<p className="font-bold"><LocalizedTestimonialContent testimonial={testimonial} field="clientName" /></p>
<p className="italic"><LocalizedTestimonialContent testimonial={testimonial} field="content" /></p>
```

For HTML content or formatted text:

```tsx
<LocalizedBlogContent 
  post={post} 
  field="content" 
  as="div" 
  dangerouslySetInnerHTML={true} 
/>
```

### 3. Use Translation Keys for Common UI Elements

For common UI elements and buttons, use the translation function from LanguageContext:

```tsx
const { t } = useLanguage();

// Before
<Button>Book Now</Button>

// After
<Button>{t('book_now', 'Book Now')}</Button>
```

### 4. Add New Translations to LanguageContext

When adding new UI elements or common terms, add translations to the `translations` object in `LanguageContext.tsx`:

```tsx
const translations = {
  'en': {
    'new_key': 'English text',
    // other translations...
  },
  'zh-Hant': {
    'new_key': '繁體中文文本',
    // other translations...
  },
  'zh-Hans': {
    'new_key': '简体中文文本',
    // other translations...
  }
}
```

### 5. Implement Multilingual Admin Interfaces

For admin interfaces, use tabs to manage content in different languages:

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="english">English</TabsTrigger>
    <TabsTrigger value="traditional_chinese">Traditional Chinese</TabsTrigger>
    <TabsTrigger value="simplified_chinese">Simplified Chinese</TabsTrigger>
  </TabsList>
  
  <TabsContent value="english">
    {/* English content form fields */}
    <Input
      name="title"
      value={formData.multilingual.english.title}
      onChange={(e) => handleMultilingualChange(e, 'english')}
    />
  </TabsContent>
  
  <TabsContent value="traditional_chinese">
    {/* Traditional Chinese content form fields */}
  </TabsContent>
  
  <TabsContent value="simplified_chinese">
    {/* Simplified Chinese content form fields */}
  </TabsContent>
</Tabs>
```

### 6. Handle Multilingual Form Data

Create a handler function for updating multilingual form data:

```tsx
const handleMultilingualChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
  language: 'english' | 'traditional_chinese' | 'simplified_chinese'
) => {
  const { name, value } = e.target
  
  setFormData(prev => ({
    ...prev,
    multilingual: {
      ...prev.multilingual,
      [language]: {
        ...prev.multilingual[language],
        [name]: value
      }
    }
  }))
}
```

### 7. Create Integrated Multilingual Components

For pages that display multiple types of multilingual content (like the home page), create integrated components that combine different content types:

#### FeaturedContent Component Example:

```tsx
// FeaturedContent.tsx
export const FeaturedContent = ({
  blogPosts,
  testimonials,
  className = ''
}: FeaturedContentProps) => {
  const { t } = useLanguage()
  
  // Filter out only featured testimonials
  const featuredTestimonials = testimonials.filter(t => t.featured).slice(0, 3)
  
  // Take the most recent blog posts
  const recentBlogPosts = [...blogPosts]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3)
  
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Featured Blog Posts */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">{t('latest_posts', 'Latest Posts')}</h2>
            <Link href="/blog">
              <Button variant="ghost" className="flex items-center gap-2 group">
                {t('view_all', 'View All')}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogPosts.map(post => (
              <div key={post.id} className="flex flex-col h-full border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Blog post content with LocalizedBlogContent */}
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <LocalizedBlogContent post={post} field="title" />
                  </h3>
                </Link>
                
                {/* Excerpt */}
                <div className="text-gray-600 mb-4 line-clamp-3">
                  <LocalizedBlogContent post={post} field="content" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Testimonials */}
        {featuredTestimonials.length > 0 && (
          <div>
            <TestimonialSection
              testimonials={featuredTestimonials}
              title={t('what_clients_say', 'What Our Clients Say')}
              subtitle={t('testimonials_subtitle', 'Read about the experiences of our satisfied clients with our beauty treatments and services.')}
              displayType="carousel"
            />
          </div>
        )}
      </div>
    </section>
  )
}
```

### 8. Implement Multilingual Home Page

Update the home page to display multilingual content by:

1. Including mock data for blog posts and testimonials with multilingual content
2. Using the FeaturedContent component to display this content in the user's selected language
3. Using translation keys for all static text elements

```tsx
// Home page implementation
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Other sections */}
      
      {/* Featured Blog Posts and Testimonials */}
      <FeaturedContent 
        blogPosts={mockBlogPosts}
        testimonials={mockTestimonials}
        className="bg-white"
      />
      
      {/* Contact CTA with translated content */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">
              {t('ready_transform', 'Ready to Transform Your Beauty?')}
            </h2>
            <p className="mb-10 text-lg">
              {t('book_consultation_desc', 'Book a consultation with our beauty experts and discover the perfect treatments for your unique needs.')}
            </p>
            <Link href="/contact">
              <Button variant="outline" className="rounded-full border-white px-8 py-3 text-sm font-medium text-white hover:bg-white hover:text-primary">
                {t('contact_us', 'Contact Us Today')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
```

## Best Practices

1. **Consistent Structure**: Maintain consistent multilingual data structure across all content types
2. **Default Fallbacks**: Always provide English content as a fallback
3. **Translation Keys**: Use translation keys for UI elements and common text
4. **Component Reuse**: Create reusable components for displaying multilingual content
5. **Integrated Components**: For pages with multiple content types, create integrated components
6. **User Preferences**: Respect user language preferences stored in LanguageContext
7. **Admin Interface**: Provide clear interfaces for content editors to manage multilingual content
8. **Documentation**: Keep this guide updated as multilingual implementation evolves

## Future Enhancements

1. **Translation API Integration**: Connect to a translation API for automated translations
2. **Language Detection**: Automatically detect user's preferred language based on browser settings
3. **Content Synchronization**: Tools to keep translations in sync when the primary language content changes
4. **Translation Memory**: Implement a system to reuse previously translated content
5. **Additional Languages**: Framework for easily adding more languages in the future 