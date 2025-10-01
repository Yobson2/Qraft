# QR Code Generator — Clean Architecture Project

**Goal:** Build a website that allows users to generate free lifetime QR codes with advanced customization (colors, logos, shapes, backgrounds, sizes, styles). The project must follow Clean Architecture principles for maintainability, modularity and scalability.

---

## Table of contents

1. Project overview
2. Technical requirements (summary)
3. Clean Architecture: layers & responsibilities
4. React project folder structure (suggested)
5. Main UI / UX components
6. API & persistence design (endpoints + DB schema suggestions)
7. Testing strategy
8. Key technical choices for performance & scalability
9. Deployment & monitoring
10. Deliverables & next steps

---

## 1. Project overview

A web application that enables users to design, preview in real time, save, manage and download QR codes. Users can keep codes for life (no expiry) and customize visuals (foreground/background colors, gradients, embedded logos, custom shapes, rounded corners, error correction level, sizes and output formats).

Use Clean Architecture to separate business rules (domain) from UI and infrastructure.

---

## 2. Technical requirements (summary)

* **Frontend:** React + TypeScript (Next.js recommended for routing, SSR/SSG and SEO).
* **Architecture:** Domain / Application / Infrastructure / UI layers.
* **Database:** Relational (Postgres) or NoSQL (MongoDB) to persist QR code configs and assets.
* **API:** REST (or GraphQL) endpoints to generate, fetch, update and delete QR codes.
* **Testing:** Unit tests for domain/usecases + components, integration tests for API and E2E for UX.
* **Outputs:** PNG, SVG, PDF downloads (server-side rendering or client-side conversion).

---

## 3. Clean Architecture — layers & responsibilities

### Domain (core business rules)

* **Entities:** `QRCode`, `User`, `Asset` (logo/image metadata), `QRCodeStyle`.
* **Value objects:** `Color`, `Size`, `ErrorCorrectionLevel`.
* **Repository interfaces (abstract):** `QRCodeRepository`, `AssetRepository`, `UserRepository`.
* **UseCases / Interactors:** `GenerateQRCode`, `SaveQRCode`, `FetchQRCode`, `UpdateQRCode`, `DeleteQRCode`, `ExportQRCode`.

> Domain must be pure TypeScript (no framework dependency).

### Application (orchestration)

* Implement use case orchestration; handle validation, composition of domain entities and calling repositories.
* Expose services for the UI (controllers/adapters) and for the infrastructure to implement.

### Infrastructure (concrete implementations)

* **Repositories:** Implement repository interfaces (DB drivers, S3, local file storage).
* **Third-party libs:** QR generation engine (e.g., `qrcode`, `qr-code-styling`, `@nuintun/qrcode`), image processing (sharp), PDF generation (pdf-lib), storage clients.
* **APIs / Controllers:** Express / Fastify / Next.js API routes that call Application layer.

### UI / Presentation

* React components, state management (Zustand / React Context / React Query / Recoil / or keep as simple hooks + local state). Use React Query for server state.
* Real-time preview component with immediate render of customization changes.

---

## 4. React project folder structure (suggested)

```
frontend/
├─ public/
│  └─ assets/
├─ src/
│  ├─ domain/                   # Types shared by domain (optional)
│  ├─ app/                      # Next.js app routes (if using Next)
│  ├─ pages/ or app/             # Next.js pages or App router
│  ├─ components/               # Reusable presentational components
│  ├─ features/
│  │  └─ qrEditor/
│  │     ├─ components/         # Editor specific components (ColorPicker, LogoUploader)
│  │     ├─ hooks/              # editor logic & state hooks
│  │     └─ styles/
│  ├─ services/                 # API client, wrappers for export
│  ├─ lib/                      # utilities (color utils, svg builders)
│  ├─ state/                    # server-state hooks (React Query) or local state
│  ├─ styles/
│  └─ index.tsx
├─ package.json
└─ tsconfig.json
```

**Notes:**

* Prefer Next.js `app/` router for modern patterns (server components + client components).
* Use React Query for caching API calls and optimistic updates.

---

## 5. Main UI / UX components

* **QR Editor Canvas** — central visual area that shows a live preview (SVG or canvas). Supports drag-and-drop logo placement.
* **Controls Panel** — inputs for colors, gradients, shapes, quiet zone, error correction, sizes, output format, and advanced settings.
* **Logo/Image Uploader** — upload or paste a logo; preview and mask it (circle/rounded/square) plus optional background.
* **Preset Library** — collection of saved styles and templates.
* **Export Modal** — select format (PNG, SVG, PDF), size, DPI and trigger download.
* **Saved Codes Dashboard** — list of generated QR codes with thumbnails, metadata, and actions (edit/duplicate/download/share/delete).
* **Auth/Account Pages** — optional for user accounts and lifetime management.

UX considerations:

* Live preview must be instant and use client-side rendering for responsiveness.
* Provide undo/redo and presets.
* Progressive enhancement: allow server-side rendering for public pages and SEO while keeping editor client-only.

---

## 6. API & persistence design

### API endpoints (REST example)

* `POST /api/qrcodes` — create & optionally generate image; returns QR metadata and URLs.
* `GET /api/qrcodes/:id` — fetch details and preview thumbnail.
* `PUT /api/qrcodes/:id` — update customization.
* `DELETE /api/qrcodes/:id` — delete code and assets.
* `GET /api/qrcodes/:id/export?format=svg|png|pdf` — generate downloadable asset on demand.

### DB schema (simplified)

**QRCode collection/table**

```sql
id (uuid)
userId (nullable)
payload (text)           -- the URL or string encoded
style (json)             -- full customization object
thumbnailUrl (string)
createdAt
updatedAt
```

**Asset table**

```sql
id
qrcodeId
url
type
metadata
```

**Indexes**: index by userId, createdAt, id

### Storage & assets

* Store generated binaries (PNG, PDF) in object storage (S3, DigitalOcean Spaces) and keep URLs in DB.
* Store vector (SVG) as text in DB or as object storage depending on size.

---

## 7. Testing strategy

* **Unit tests (Jest + Testing Library):** domain usecases, utility functions (SVG builder, color conversions), React components.
* **Integration tests:** API endpoints (supertest), repository implementations (test DB or in-memory DB like sqlite for integration).
* **E2E tests:** Cypress or Playwright to test editor flows — create → customize → export.
* **Performance tests:** measure export latency under load.

---

## 8. Key technical choices (performance & scalability)

* **Client-side rendering for editor & preview:** instant UX with SVG/canvas.
* **Server-side export for heavy conversions:** for large PDFs or high-DPI PNGs use a Node worker (Sharp + headless browser if needed). Offload to background jobs (BullMQ, Sidekiq equivalent) if exports are heavy.
* **Caching thumbnails:** store and CDN the thumbnails.
* **Use serverless or microservices for scaling:** separate export service, API service, and web frontend.
* **Queueing:** background workers for expensive tasks.
* **Use vec
