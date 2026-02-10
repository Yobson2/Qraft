# Qraft - QR Code Generator

Create beautiful, fully customizable QR codes in seconds — 100% free, no signup required.

**Live Demo:** [qraft-self.vercel.app](https://qraft-self.vercel.app/)

## Features

- **Custom Colors & Gradients** — Solid colors, linear and radial gradients with rotation control
- **QR Code Patterns** — Multiple dot styles (square, dots, rounded, classy) and corner styles
- **Logo Embedding** — Upload a logo with adjustable size, margin, and background masking
- **Preset Templates** — Quick-start with pre-configured style presets
- **Error Correction Levels** — L (7%), M (15%), Q (25%), H (30%)
- **Multiple Export Formats** — Download as PNG, SVG, or JPEG
- **Adjustable Size** — 128px to 1024px with margin control
- **Real-Time Preview** — Instant visual feedback as you customize
- **No Watermarks** — HD quality output, unlimited downloads

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Turbopack) |
| UI | [React](https://react.dev) 19, [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4, [Radix UI](https://www.radix-ui.com) |
| QR Generation | [qr-code-styling](https://github.com/nicebucla/qr-code-styling), [qrcode](https://github.com/soldair/node-qrcode) |
| Animations | [GSAP](https://gsap.com) |
| Deployment | [Vercel](https://vercel.com) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/your-username/qraft.git
cd qraft
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   └── api/qrcodes/      # REST API endpoints
├── domain/               # Entities, value objects, repository interfaces, use cases
├── infrastructure/       # Repository implementations, QR generator adapters
├── features/
│   └── qr-editor/        # Editor components, hooks, and presets
├── components/ui/        # Reusable UI primitives (Button, Card, Input, etc.)
├── hooks/                # Shared custom hooks
├── lib/                  # Utilities and animation configs
└── styles/               # Global styles
```

The project follows **Clean Architecture** with separated domain, infrastructure, and presentation layers.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/qrcodes` | Create a new QR code |
| `GET` | `/api/qrcodes/:id` | Fetch a QR code by ID |
| `PUT` | `/api/qrcodes/:id` | Update QR code styling |
| `DELETE` | `/api/qrcodes/:id` | Delete a QR code |
| `GET` | `/api/qrcodes/:id/export?format=svg\|png\|pdf` | Export in a specific format |

## License

This project is open source.
