# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Qraft** is a QR Code Generator web application that allows users to create free lifetime QR codes with advanced customization options (colors, logos, shapes, backgrounds, sizes, styles). Built with Next.js 15.5.4, React 19.1.0, TypeScript, and Tailwind CSS 4, following Clean Architecture principles for maintainability, modularity and scalability.

## Development Commands

### Running the application
- **Development server**: `npm run dev` (uses Turbopack)
  - Server runs at http://localhost:3000
  - Hot reload enabled
- **Production build**: `npm run build` (uses Turbopack)
- **Start production server**: `npm start`
- **Lint**: `npm run lint` (uses ESLint with Next.js TypeScript config)

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4 with App Router
- **React**: 19.1.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4 with PostCSS
- **Bundler**: Turbopack
- **Fonts**: Geist and Geist Mono (via next/font)

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration and metadata
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles and Tailwind directives
- `public/` - Static assets
- Path alias: `@/*` maps to `./src/*`

### TypeScript Configuration
- Target: ES2017
- Module resolution: bundler
- Strict mode enabled
- JSX: preserve (handled by Next.js)
- Incremental compilation enabled

### ESLint Configuration
- Extends `next/core-web-vitals` and `next/typescript`
- Uses FlatCompat for compatibility
- Ignores: node_modules, .next, out, build, next-env.d.ts

### Styling
- Tailwind CSS 4 with PostCSS plugin
- Custom CSS variables for theming (foreground/background)
- Dark mode support via CSS variables
- Font variables set in root layout

## Clean Architecture Layers

This project follows Clean Architecture with clear separation of concerns:

### Domain Layer (Core Business Rules)
- **Entities**: `QRCode`, `User`, `Asset` (logo/image metadata), `QRCodeStyle`
- **Value Objects**: `Color`, `Size`, `ErrorCorrectionLevel`
- **Repository Interfaces**: `QRCodeRepository`, `AssetRepository`, `UserRepository`
- **Use Cases**: `GenerateQRCode`, `SaveQRCode`, `FetchQRCode`, `UpdateQRCode`, `DeleteQRCode`, `ExportQRCode`
- Domain layer must be pure TypeScript with no framework dependencies

### Application Layer (Orchestration)
- Implements use case orchestration
- Handles validation and composition of domain entities
- Exposes services for UI controllers and infrastructure implementations

### Infrastructure Layer (Concrete Implementations)
- **Repositories**: Database implementations (Postgres/MongoDB)
- **Third-party Libraries**: QR generation (`qrcode`, `qr-code-styling`, `@nuintun/qrcode`), image processing (sharp), PDF generation (pdf-lib)
- **APIs**: Next.js API routes calling the Application layer
- **Storage**: Object storage for assets (S3, DigitalOcean Spaces)

### UI/Presentation Layer
- React components with local state management
- React Query for server state management
- Real-time preview component with immediate rendering of customization changes

## Suggested Folder Structure

```
src/
├── domain/              # Domain entities, value objects, interfaces
├── app/                 # Next.js App Router (pages, layouts, API routes)
├── components/          # Reusable presentational components
├── features/
│   └── qrEditor/
│       ├── components/  # Editor-specific (ColorPicker, LogoUploader)
│       ├── hooks/       # Editor logic & state hooks
│       └── styles/
├── services/            # API client wrappers
├── lib/                 # Utilities (color utils, svg builders)
├── state/               # React Query hooks for server state
└── styles/              # Global styles
```

## Key Features to Implement

### QR Customization
- Foreground/background colors and gradients
- Embedded logos with masking (circle/rounded/square)
- Custom shapes and rounded corners
- Error correction levels
- Multiple output formats (PNG, SVG, PDF)
- Variable sizes and DPI settings

### Main Components
- **QR Editor Canvas**: Live preview with drag-and-drop logo placement
- **Controls Panel**: Inputs for all customization options
- **Logo/Image Uploader**: Upload/paste logos with preview
- **Preset Library**: Saved styles and templates
- **Export Modal**: Format selection and download trigger
- **Saved Codes Dashboard**: Manage generated QR codes with thumbnails
- **Auth/Account Pages**: Optional user accounts for lifetime management

## API Design

### Endpoints (REST)
- `POST /api/qrcodes` - Create & generate QR code
- `GET /api/qrcodes/:id` - Fetch QR code details
- `PUT /api/qrcodes/:id` - Update customization
- `DELETE /api/qrcodes/:id` - Delete QR code and assets
- `GET /api/qrcodes/:id/export?format=svg|png|pdf` - Export in specified format

### Database Schema

**QRCode**
- id (uuid)
- userId (nullable)
- payload (text) - URL or string encoded
- style (json) - Full customization object
- thumbnailUrl (string)
- createdAt, updatedAt

**Asset**
- id, qrcodeId, url, type, metadata
- Indexes on userId, createdAt, id

## Performance & Scalability

- **Client-side rendering**: Editor & preview use SVG/canvas for instant UX
- **Server-side export**: Heavy conversions (large PDFs, high-DPI PNGs) use Node workers
- **Caching**: Thumbnails stored and served via CDN
- **Background jobs**: Queue expensive export tasks (consider BullMQ)
- **Microservices ready**: Separate export service, API service, and frontend

## Testing Strategy

- **Unit tests**: Domain use cases, utilities, React components (Jest + Testing Library)
- **Integration tests**: API endpoints (supertest), repository implementations
- **E2E tests**: Editor flows with Cypress or Playwright (create → customize → export)
- **Performance tests**: Export latency under load
