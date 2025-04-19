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

### Pending Tasks (Prioritized)
1. Create individual treatment pages
2. Set up Playwright testing framework
3. Create initial tests for core functionality
4. Implement responsive design refinements for mobile devices
5. Add animations and transitions for improved UX

### Backlog Tasks
- Implement Memory Viewer component for debugging
- Add more comprehensive test coverage
- Refine UI/UX based on prototype feedback
- Document component usage patterns
- Create storybook or component showcase

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
- Add authentication UI (for prototype only)
- Create booking workflow
- Develop user profile section

### Phase 4: Testing and Refinement
- Implement Playwright tests
- Run regression tests
- Fix issues and refine UI
- Document components and usage

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