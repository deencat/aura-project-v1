# Project Management Plan

## Project Overview
This project is a frontend prototype with a memory management component (MCP) that provides persistent storage of project information. The project is currently in prototyping mode, focusing on developing the frontend interface without connecting to backend logic.

## Development Guidelines

### General Guidelines
- We are in prototyping mode - focus on frontend development only
- Use dummy JSON to represent data
- Link all components for navigation
- Make buttons responsive
- Don't connect to backend logic
- Always check the problems window for issues and fix them

### Memory MCP Requirements (CRITICAL)
- **IMPORTANT**: Always add to memory MCP by calling "npm run memory-add-conversation" after 20 tool calls or 25 conversations
- This is a critical requirement to maintain project context and knowledge

### Memory MCP Usage
- Use `npm run memory-add-conversation` to add conversations to memory
- Check memory service health with `npm run memory-check`
- Initialize memory with `npm run memory-init` if needed
- Start memory service with `npm run memory-stub` or `npm run memory-start`

### Code Structure
- Follow the recommended file structure:
  ```
  src/
  ├── app/
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── [feature]/
  │       ├── page.tsx
  │       ├── layout.tsx
  │       └── _components/
  ├── ui/               # Base Shadcn components
  ├── components/       # Composed reusable components
  ├── features/         # Feature-specific components
  ├── public/           # Static assets
  ├── styles/           # Global CSS
  └── next.config.js
  ```

### Component Development
- Use 'use client' directive for client-side components
- Use Tailwind CSS for styling
- Use shadcn components where possible
- Use lucide-react for icons

### Database Integration (For Future Reference)
- Use Prisma as the only database client
- Keep database logic in dedicated service layers
- Use Prisma's type-safe queries

### Authentication (For Future Reference)
- Use Clerk for authentication
- Use clerkMiddleware (not deprecated authMiddleware)
- Protect /app routes in middleware

### Testing
- Add newly changed features to Playwright tests
- Run full Playwright regression tests after each change
- Fix any negative test results
- Terminate lingering Playwright report server processes before running tests again
- Update test selectors when component implementations change (like with TreatmentImage)
- Available test scripts:
  - `npm test`: Run all Playwright tests
  - `npm run test:ui`: Run tests with Playwright UI mode
  - `npm run test:debug`: Run tests in debug mode
  - `npm run test:report`: Show the Playwright HTML report

### Git Commit Messages
- Follow the prefix convention:
  - "Feat(component): add new component"
  - "Fix(api): fix api error"
  - "Docs(readme): update readme"
  - "Refactor(utils): refactor utils"
  - "Style(tailwind): add new tailwind class"
  - "Test(unit): add unit test"
  - "Chore(deps): update dependencies"

## Task Management

### Completed Tasks
- Initial project setup
- Memory MCP server implementation
- Documentation structure creation
- Website redesign based on EternalCareBeauty.com structure and provided design
- Implemented responsive homepage with new design system
- Created About page with updated design
- Created Contact page with contact form and information
- Created Treatments landing page
- Updated site-wide components (Header, Footer) to match design system
- Set primary color scheme to orange/coral (#F87558) based on design
- Added secondary turquoise color (#5CD7C9) for accent elements
- Created styled placeholder component for images instead of relying on static files
- Implemented visual enhancements throughout the site with the PlaceholderImage component
- Created "Royal Black Scan" treatment page with content from EternalCareBeauty.com
- Fixed dropdown menu hover issue in navigation to improve UX
- Restructured main navigation to show all menu items on the top level
- Set up Playwright testing framework and initial tests
- Added test scripts for different testing modes
- Created individual treatment pages:
  - Peeled Egg Skin treatment page with detailed sections and image carousel
  - Laser Treatment page with comprehensive content
  - Collagen Regeneration page with detailed information
- Added carousel components to treatment pages using shadcn/ui components
- Implemented consistent naming conventions for placeholder images across treatment pages
- Fixed routing conflict in the admin blog edit pages by standardizing on the [id] parameter
- Added missing shadcn/ui Tabs component required by the admin blog edit page
- Created .env.local file to disable Google Fonts during development for faster loading
- Created "Perfect Buttocks" page with Peach Lift Sculpting Machine content
- Removed "Experience Our Advanced Technology" section from Perfect Buttocks page to streamline content
- Removed all references to "Milk Bubble" page from navigation as this service is no longer offered
- Updated navigation menu in Header.tsx to reflect current service offerings
- Created "Goddess Curves" (Breast Enhancement) page with detailed content about the cellular breast vitality treatment
- Created "Hair Removal" page with comprehensive content and image carousel
- Added placeholder images for various treatments with correct naming conventions
- Removed "Crystal Micro-Needling" page and all related navigation references from the site
- Redesigned Header and main navigation components with a cleaner, modern approach inspired by EstheClinic's website design
- Replaced AI Facial menu with New Doublo menu in the navigation structure
- Created comprehensive main New Doublo landing page with treatment options, technology explanations, and marketing content
- Created specialized landing pages for New Doublo treatments:
  - Sculpt & Lift page targeting young professionals seeking facial contouring
  - V-Line Perfection page highlighting K-beauty jawline trends for young Hong Kong women
- Created Lymphatic Detox page under Body Care section with detailed treatment information and benefits
- Enhanced V-Line Perfection page with a testimonial section featuring client experiences:
  - Added a 2x2 grid layout of testimonials with images and ratings
  - Implemented responsive design for testimonial display
  - Created authentic-sounding client testimonials to showcase real results
  - Improved visual presentation with optimized spacing and typography
- Added comprehensive Playwright tests for new pages:
  - Created new-doublo.spec.ts test file to validate all New Doublo pages
  - Created lymphatic-detox.spec.ts test file to ensure proper functionality
  - Added navigation tests to verify menu functionality
- Created Youth Revival page with sophisticated marketing content:
  - Implemented professional conversion-focused layout drawing from successful beauty marketing
  - Added sections addressing customer pain points and concerns
  - Created compelling benefits presentation with 4-in-1 results format
  - Incorporated dual-technology explanation with technical details
  - Added strategic pricing presentation with clear value proposition (43% savings)
  - Included satisfaction guarantee to reduce perceived purchase risk
  - Designed comprehensive FAQ section addressing common objections
- Enhanced page visuals with video elements:
  - Replaced static hero image with looping video on the Youth Revival page
  - Implemented video in the Ultimate Solution section on Youth Revival page
  - Replaced hero image with video on Hair Removal page for more engaging user experience
  - Created proper video components with autoplay, loop, and mute attributes for optimal performance
  - Added appropriate Playwright tests to verify video content loads correctly
- Enhanced CMS functionality for content management:
  - Created comprehensive service management system
  - Added Edit Service functionality with form pre-population
  - Implemented service filtering and search capabilities
  - Added language tabs for multilingual content (UI framework)
  - Created image management interfaces for featured and gallery images
  - Added delete confirmation dialog with warning
  - Implemented preview functionality to view services from admin panel
  - Expanded Playwright tests to verify CMS functionality
  - Designed intuitive UI for content editors with responsive layouts
- Created reusable TreatmentImage component to standardize image handling:
  - Implemented consistent image sizing and display across treatment pages
  - Added support for categorizing images by treatment type
  - Created easy-to-use props interface for specifying image category, treatment, type, and index
  - Designed the component to handle different image display contexts (hero, feature, avatar, etc.)
  - Implemented consistent styling for all treatment-related images
  - Updated New Doublo page to use TreatmentImage for testimonial avatars and benefits section
  - Updated Hair Removal page to use TreatmentImage for all treatment images
  - Created comprehensive Playwright tests for TreatmentImage component rendering
  - Improved responsive behavior of images across all device sizes
- Created "Glow" facial treatment page with detailed content:
  - Implemented comprehensive treatment description with multi-layer benefits
  - Created image carousel for treatment benefits using TreatmentImage component
  - Added interactive FAQ section with expandable content
  - Styled with consistent design system based on site standards
  - Created proper directory structure for treatment images
  - Added comprehensive Playwright tests to verify page functionality and content
- Enhanced image persistence in CMS admin interface:
  - Improved serviceStorage utility with versioning, timestamps, and backup mechanisms
  - Added session storage backup for data resilience and cross-tab synchronization
  - Enhanced cache-busting for service images with per-service timestamp tracking
  - Added debug logging system for troubleshooting in development mode
  - Created "Refresh Images" button for manual cache invalidation when needed
  - Updated API endpoints to ensure proper image processing and storage
  - Enhanced PlaceholderImage component to work with cache-busted image URLs
  - Implemented error handling for robust operation in prototype environment
- Implemented Playwright tests for image persistence functionality:
  - Added tests for service data persistence in localStorage
  - Created tests to verify session storage serves as backup system
  - Implemented tests for image cache versioning
  - Added test for Refresh Images button functionality
  - Created tests to verify that images load properly with cache busting
- Updated Playwright tests for TreatmentImage component usage:
  - Created robust tests that work with actual page content
  - Added tests for fallback image functionality
  - Implemented tests to verify TreatmentImage component consistency
  - Added tests for different image categories (hero, benefits, etc.)
  - Improved test resilience by making selectors more flexible
  - Added detailed logging for easier test debugging
- Enhanced TreatmentImage component with improved functionality:
  - Added support for multiple fallback behaviors (placeholder, generic, none)
  - Implemented automatic slug formatting for consistent path handling
  - Added quality and sizes props for better image optimization
  - Implemented objectFit property for more flexible image display
  - Added refreshOnError capability to automatically purge cache on failures
  - Improved error handling and logging
- Created standardization tools for image management:
  - Developed generate-placeholders.js script to create consistent placeholder images
  - Created standardize-image-paths.js to enforce proper directory structure
  - Implemented update-treatment-pages.js to analyze and report needed updates
  - Added comprehensive documentation in src/components/README.md
  - Created an example page demonstrating proper TreatmentImage usage
  - Added Playwright tests specifically for TreatmentImage functionality

### Pending Tasks (Prioritized)
1. Create additional treatment pages for remaining services
   - Implement treatment pages for any missing facial treatments
   - Add specialized body treatment pages as needed
   - Ensure all pages use standardized components and structure
2. Enhance CMS functionality for content management
   - Complete blog & testimonial management functionality
   - Support multilingual content (Traditional Chinese, Simplified Chinese, English)
   - Implement promotion & coupon code management
   - Develop staff profile management interface
3. Add more comprehensive test coverage
4. Implement responsive design refinements for mobile devices
5. Add animations and transitions for improved UX

### Backlog Tasks
- Implement Memory Viewer component for debugging
- Refine UI/UX based on prototype feedback
- Document component usage patterns
- Create storybook or component showcase
- Add membership tier & perk management to CMS
- Implement loyalty token configuration in CMS (earning rules, redemption options)
- Add basic order management for online payments/retail

## Project Phases

### Phase 1: Setup and Foundation (COMPLETED)
- Set up project structure
- Integrate shadcn UI
- Implement memory MCP integration
- Create basic layouts and navigation

### Phase 2: Design Implementation (COMPLETED)
- Redesign website based on EternalCareBeauty.com structure
- Implement new design system with orange/coral color scheme
- Create responsive UI components
- Develop core pages (Home, About, Contact, Treatments)

### Phase 3: Feature Development (IN PROGRESS)
- Implement individual treatment pages
  - Royal Black Scan page (completed)
  - Peeled Egg Skin page (completed)
  - Laser Treatment page (completed)
  - Collagen Regeneration page (completed)
  - Perfect Buttocks page with Peach Lift Sculpting Machine content (completed)
  - Goddess Curves (Breast Enhancement) page (completed)
  - Hair Removal page (completed)
  - New Doublo main landing page (completed)
  - New Doublo Sculpt & Lift page (completed)
  - New Doublo V-Line Perfection page (completed)
  - New Doublo Youth Revival page (completed)
  - New Doublo Neck Rejuvenation page (completed)
  - Lymphatic Detox page (completed)
  - Glow Facial Treatment page (completed)
  - Other treatment pages (pending)
- Develop CMS functionality (CURRENT FOCUS)
  - Admin interface for content management
  - Service & pricing management
  - Blog & testimonial management
  - Multilingual content support
- Add authentication UI (for prototype only)
- Create booking workflow
- Develop user profile section

### Phase 4: Testing and Refinement (IN PROGRESS)
- Implement Playwright tests (initial tests completed)
- Run regression tests
- Fix issues and refine UI
- Document components and usage

### Phase 5: Advanced Features (PLANNED)
- Implement membership & loyalty features
- Add online shop functionality
- Create virtual consultation interface
- Develop AI skin analysis integration
- Set up payment gateway integration (for prototype)

## Regular Maintenance Tasks
- Check memory MCP health
- Run Playwright tests after changes
- Update project management documentation
- Add conversations to memory MCP
- Check problems window for issues

## Definition of Done
- Code follows project structure guidelines
- Components are responsive
- Navigation between components works
- Playwright tests pass
- No issues in problems window
- Changes documented in project management plan
- Conversations added to memory MCP

## Design System Notes
- Primary color: #F87558 (orange/coral)
- Secondary color: #5CD7C9 (turquoise)
- Font Family: 
  - Headings: Playfair Display (serif)
  - Body: Inter (sans-serif)
- Border radius: Rounded corners for cards, full rounded for buttons
- Card style: White background with light border and subtle shadow on hover
- Button style: Rounded with consistent padding, primary color for CTA buttons
- Section spacing: Consistent vertical padding between sections
- Image Placeholders: Using styled PlaceholderImage component with themed designs for different types of images
- Video Integration: Looping videos for hero backgrounds and demonstration sections