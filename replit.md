# Smart Urban Planner

## Overview

Smart Urban Planner is a full-stack web platform that empowers urban planners, city officials, and citizens to make data-driven decisions using NASA Earth Observation data. The application visualizes environmental metrics (air quality, vegetation health, temperature, water quality), provides AI-powered insights and recommendations, enables what-if scenario simulations, and facilitates community engagement through crowdsourced reporting.

The platform combines real-time satellite data visualization with machine learning-powered predictive analytics to help cities plan sustainable interventions and monitor environmental health.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized production builds
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TanStack Query (React Query)** for server state management, caching, and data fetching

**UI Component System**
- **Shadcn/ui** design system with Radix UI primitives for accessible, composable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **CVA (Class Variance Authority)** for type-safe component variant management
- Theme system supporting dark/light modes via React Context

**Key Design Decisions**
- Component co-location: UI components in `client/src/components/`, pages in `client/src/pages/`
- Path aliases configured (`@/` for client, `@shared/` for shared types) for clean imports
- Responsive-first design with mobile breakpoint utilities

### Backend Architecture

**Server Framework**
- **Express.js** for HTTP server and API routing
- **TypeScript** throughout for type safety across client and server
- ESM modules (not CommonJS) as indicated by `"type": "module"` in package.json

**API Structure**
- RESTful endpoints under `/api` namespace:
  - `/api/nasa/*` - NASA data integration endpoints
  - `/api/ai/*` - AI-powered insights generation
  - `/api/community/*` - Community reporting features
  - `/api/reports/*` - Policy report generation
- Custom logging middleware for API request tracking
- Error handling middleware for consistent error responses

**Development vs Production**
- Vite dev server integration in development mode
- Static file serving in production
- Environment-based configuration via `NODE_ENV`

### Data Storage & Management

**Database**
- **PostgreSQL** via Neon serverless driver (`@neondatabase/serverless`)
- **Drizzle ORM** for type-safe database queries and migrations
- Database schema defined in `shared/schema.ts` with Zod validation

**Schema Design**
- `users` table - Authentication and user management
- `community_reports` table - Citizen-submitted environmental reports with location data, categories, upvoting, and status tracking
- `simulations` table - What-if scenario configurations and predictions stored as JSONB

**Data Validation**
- Drizzle-Zod integration generates runtime validation schemas from database schema
- Shared types between client and server for consistency

**Storage Abstraction**
- `IStorage` interface in `server/storage.ts` allows for multiple storage backends
- `MemStorage` implementation for in-memory development/testing
- Database implementation would follow the same interface contract

### External Dependencies

**NASA Earth Observation Data**
- Custom `NASAService` class (`server/services/nasa.ts`) abstracts data fetching
- Metrics: Air Quality Index (AQI), Vegetation Index (NDVI), Temperature, Water Quality (pH)
- Historical data tracking for trend analysis
- Location-based queries supporting both named locations and coordinates

**AI & Machine Learning**
- **OpenAI GPT-4** integration via `server/services/openai.ts`
- AI-powered insight generation analyzing environmental data
- Recommendations with severity classification (low/medium/high)
- What-if simulation predictions for intervention modeling

**Mapping & Geospatial**
- **Leaflet.js** for interactive map visualization
- CartoDB dark tile layers for base maps
- Support for heatmaps, markers, and data overlays
- Location search and coordinate input

**Data Visualization**
- **Recharts** library for charts (line charts, area charts, bar charts)
- Custom chart components with consistent theming
- Time-series data visualization for historical trends

**PDF Generation**
- **jsPDF** for generating policy reports and data exports
- Server-side PDF generation from environmental metrics and insights

**Session & Authentication**
- **connect-pg-simple** for PostgreSQL-backed session storage
- User authentication schema ready for implementation

**Development Tools**
- Replit-specific plugins for development banner, error overlay, and cartographer
- ESBuild for production bundling
- Drizzle Kit for database migrations

### Key Architectural Patterns

**Separation of Concerns**
- Shared types/schemas in `/shared` directory consumed by both client and server
- Service layer pattern for external integrations (NASA, OpenAI)
- Component/container separation in React architecture

**Progressive Enhancement**
- Mock/simulated data fallbacks when APIs unavailable
- Graceful degradation of AI features

**Type Safety**
- End-to-end TypeScript from database schema to React components
- Zod runtime validation at API boundaries
- Strict TypeScript configuration with no implicit any

**Performance Optimizations**
- React Query caching strategies with infinite stale time for static data
- Lazy loading and code splitting via Vite
- Optimized production builds with tree shaking