# SalonID Design - Multi-Step Form Application

## Overview
This is a Next.js 14 application for SalonID Design that provides a multi-step form interface for creating custom salon product designs. The application uses TypeScript, Tailwind CSS, and Radix UI components for the frontend, with Supabase for backend services and Twilio for SMS/OTP functionality.

## Project Architecture
- **Frontend**: Next.js 14 with TypeScript and React 18
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **SMS/OTP**: Twilio
- **Email**: Nodemailer
- **Package Manager**: npm

## Key Features
- Multi-step questionnaire form for salon product customization
- Style selection (elegant/modern variants)
- Color scheme and palette selection
- Client details collection with OTP verification
- Admin dashboard for managing submissions
- Real-time form data context management

## Environment Setup
The application requires the following environment variables in `.env.local`:

### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_URL`: Server-side Supabase URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for elevated operations

### Twilio Configuration
- `TWILIO_ACCOUNT_SID`: Twilio account identifier
- `TWILIO_AUTH_TOKEN`: Twilio authentication token
- `TWILIO_VERIFY_SERVICE_SID`: Twilio Verify service ID

### Email Configuration
- `EMAIL_FROM`: Sender email address
- `EMAIL_USER`: Email service username
- `EMAIL_PASS`: Email service password

## Development Workflow
The development server runs on port 5000 with the command:
```bash
npm run dev -- --port 5000 --hostname 0.0.0.0
```

## Database Schema
The application uses several database tables (SQL scripts available in `/scripts/`):
- `form_submissions`: Main form data storage
- `clients`: Client information and management
- `design_responses`: Design response history
- `email_otps`: OTP management for email verification
- `email_events`: Email event tracking
- `questionnaire_progress`: Progress tracking

## Deployment Configuration
- **Target**: Autoscale deployment
- **Build**: `npm run build`
- **Start**: `npm start -p $PORT -H 0.0.0.0` (Cloud-compatible)

## Recent Changes (September 19, 2025)
- **COMPLETED: Fixed selection state persistence across 8+ form slides**
  - Updated Slide3, Slide11, Slide12-15, Slide9-10 to read from formData
  - Selections now properly persist when navigating back and forward
  - All variant selections, icon choices, and style selections maintained
- **COMPLETED: Updated phone number requirements and UI**
  - Made phone number field mandatory (was optional)
  - Removed flag emojis from country selector button to prevent height issues
  - Updated validation to require phone input before continuing
- **COMPLETED: Added mobile navigation scroll behavior**
  - Implemented fade-out/fade-in effect for sticky header and footer on mobile
  - Navigation bars fade to 20% opacity during scroll on screens ≤768px width
  - Navigation automatically fades back in 150ms after scrolling stops
  - Desktop behavior remains unchanged with persistent navigation
- **COMPLETED: Global mobile side-scrolling implementation**
  - Slide7: Changed from 3-column to 2-column layout with ResponsiveCarousel
  - Slide9: Added ResponsiveCarousel for icon choice selection
  - Slide10: Complete redesign with improved UX (see below)
  - Slides 12-15: Replaced grids with ResponsiveCarousel for consistent mobile experience
  - Slide30: Kept as vertical scrollable list per design preference
- **COMPLETED: Slide10 icon selection UX redesign**
  - Removed avatar icon, continue button, and footer text/line
  - Changed text alignment from center to left using global typography
  - Desktop: 3 rows of 5 icons with hover scale effects for visual feedback
  - Mobile: Grouped icons in swipeable rows of 3 with tap feedback
  - Auto-advances on selection without requiring separate button
- **COMPLETED: Fixed uniform navigation behavior across all choice slides**
  - Fixed StepNavigation component to properly recognize icon-selection and ingredients as choice steps
  - When users navigate back to slides with existing selections, the "Doorgaan" button is now properly enabled
  - Ensures consistent behavior across all selection slides (Slide10, Slide30, etc.)
  - Users can now use sticky footer navigation to continue from previously completed choice slides

## Recent Changes (September 18, 2025)
- Configured for Replit environment
- Set up proper Next.js configuration for proxy environment
- Created development workflow
- Configured deployment settings
- All dependencies installed and working
- **COMPLETED: Comprehensive TypeScript Refactoring**
  - Resolved 76+ TypeScript errors achieving zero compilation errors
  - Implemented industry-standard XState v5 state machine for wizard flow
  - Created type-safe step registry pattern with proper StepProps interface
  - Achieved true type safety without any "any" types
  - Fixed OTP email verification flow with automatic generation and state management
  - Enhanced scalability to support 1000+ form steps with cycle detection
  - Production-ready implementation verified by architectural review
- **COMPLETED: Centralized Database Configuration System**
  - Implemented centralized field mappings in `lib/database/field-mappings.ts`
  - Eliminated 26+ lines of duplicate database mapping code from API routes
  - Created type-safe transformation functions for all data types
  - Added debug database submission functionality for development testing
  - Fixed critical security vulnerability in database access policies
  - All database fields properly mapped with perfect schema alignment

## Project Structure
- `/app`: Next.js app router structure with API routes
- `/components`: React components including UI and step components
- `/lib`: Utility functions, types, and service integrations
- `/contexts`: React context providers
- `/public`: Static assets and images
- `/scripts`: Database initialization and migration scripts
- `/styles`: Global CSS styles

## User Preferences
- Full TypeScript type checking enabled for production-quality code
- Images are unoptimized for development speed
- ESLint checking enabled for code quality