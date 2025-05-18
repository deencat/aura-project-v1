# Aura Beauty

A modern beauty salon website built with Next.js, featuring multilingual support for services, blog posts, and testimonials.

## Features

- **Modern UI**: Clean, responsive design built with Tailwind CSS
- **Multilingual Support**: Content available in English, Traditional Chinese, and Simplified Chinese
- **Service Showcase**: Detailed pages for each beauty treatment and service
- **Blog System**: Multilingual blog posts with categories and search functionality
- **Testimonials**: Client testimonials in multiple languages
- **Admin Dashboard**: Content management system for services, blog posts, and testimonials
- **Authentication**: Secure admin access with Clerk authentication

## Multilingual Implementation

The website supports multiple languages (English, Traditional Chinese, and Simplified Chinese) for:

- **Services**: Treatment descriptions, details, and benefits
- **Blog Posts**: Titles, content, and meta descriptions
- **Testimonials**: Client names and testimonial content

The multilingual system uses React Context to manage language selection and provides specialized components to display content in the user's preferred language.

For detailed information, see the [Multilingual Implementation Guide](src/documentation/multilingual-implementation-guide.md).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **State Management**: React Context
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aura-beauty.git
   cd aura-beauty
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Then fill in the required values in `.env.local`.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── admin/            # Admin dashboard pages
│   ├── blog/             # Blog pages
│   ├── testimonials/     # Testimonials page
│   └── treatments/       # Treatment pages
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── LocalizedBlogContent.tsx
│   ├── LocalizedServiceContent.tsx
│   └── LocalizedTestimonialContent.tsx
├── contexts/             # React contexts
│   └── LanguageContext.tsx
├── utils/                # Utility functions
│   ├── blogUtils.ts
│   ├── serviceUtils.ts
│   └── testimonialUtils.ts
└── documentation/        # Project documentation
    └── multilingual-implementation-guide.md
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

The memory server runs on port 3100 and provides:
- Persistent storage of project information in memory.json
- Entity and relationship management
- Memory API for accessing stored data

### Memory System Commands

#### Service Management
```bash
# Start the memory server
npm run memory-stub

# Initialize project memory with default entities
npm run memory-init

# Check memory service health
./scripts/memory/check-memory-status.sh

# Start/restart the memory service
./scripts/memory/start-memory-service.sh
```

#### Memory Operations
```bash
# Show latest memory entity details
npm run memory-get-latest

# Add a new conversation entry to memory
npm run memory-add-conversation

# Delete the most recent memory entity
npm run memory-remove

# Run example script demonstrating memory usage
npm run memory-example
```

### Memory Architecture

The memory system consists of:
1. **Local Memory Storage** - Uses a JSON file to store entities and relations
2. **Memory Server** - Simple HTTP server that provides the memory API
3. **Client Library** - JavaScript client for interacting with the memory system

Core components:
- `memory-stub.js`: Local memory server implementation
- `memory-client.js`: Client library for accessing memory
- `memory-system.js`: Direct file-based memory system
- `memory.json`: Storage file for all memory data
