# Multilingual Implementation Guide for Aura Beauty

This guide outlines the steps to implement multilingual support across the Aura Beauty website, allowing content to be displayed in English, Traditional Chinese, and Simplified Chinese.

## Overview

The multilingual system consists of:

1. **LanguageSwitcher Component**: UI element for users to change their language preference
2. **LanguageContext Provider**: Context for storing and accessing the current language
3. **LocalizedServiceContent Component**: Component for displaying content in the selected language
4. **Translation Keys**: Common UI elements and text stored in the LanguageContext
5. **Multilingual Data Structure**: Format for storing multilingual content in service data

## Implementation Steps

### 1. Add Multilingual Data to Service Objects

Update service data objects to include multilingual content:

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

### 2. Update Service Pages

Replace direct text references with the LocalizedServiceContent component:

```tsx
// Before
<h1>{service.name}</h1>
<p>{service.short_description}</p>

// After
<h1><LocalizedServiceContent service={service} field="name" /></h1>
<p><LocalizedServiceContent service={service} field="short_description" /></p>
```

For HTML content or formatted text:

```tsx
<LocalizedServiceContent 
  service={service} 
  field="benefits" 
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

### 5. Handle Dynamic Content with Language-Specific Logic

For content that needs to change based on language but isn't part of a service object:

```tsx
const { language } = useLanguage();

const altText = language === 'en' ? 
  "English alt text" : 
  language === 'zh-Hant' ? 
    "繁體中文替代文本" : 
    "简体中文替代文本";

<TreatmentImage 
  alt={altText}
  // other props...
/>
```

## Example Implementation

See the following files for reference implementations:

1. `src/app/treatments/example-multilingual/page.tsx` - Complete example of a multilingual service page
2. `src/app/treatments/glow/page.tsx` - Real-world implementation of multilingual content
3. `src/components/LocalizedServiceContent.tsx` - Component for displaying localized content
4. `src/contexts/LanguageContext.tsx` - Context provider and translations
5. `src/components/LanguageSwitcher.tsx` - UI component for switching languages

## Best Practices

1. **Always provide fallbacks**: Include English content as a fallback when translations are missing
2. **Use semantic keys**: For translation keys, use descriptive names that indicate the purpose
3. **Group related translations**: Keep related translations together in the translations object
4. **Test all languages**: Verify that content displays correctly in all supported languages
5. **Consider text expansion**: Chinese translations may be shorter than English, so design UI to accommodate different text lengths

## Admin Interface

The service edit page (`src/app/admin/services/edit/[id]/page.tsx`) already includes language tabs for editing multilingual content. The form organizes content by language and shows completion percentages for each language.

When saving a service, the multilingual data is structured as described above and can be used by the LocalizedServiceContent component.

## Next Steps

1. Apply multilingual support to all service pages
2. Add multilingual support for blog posts and testimonials
3. Implement language-specific SEO metadata
4. Add language preference detection based on browser settings 