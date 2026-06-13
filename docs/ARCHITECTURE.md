# Portfolio Builder — System Architecture

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐ │
│  │  Marketing Site │  │  Dashboard SPA  │  │  Public Portfolio   │ │
│  │   (React/Vite)  │  │  (React/Vite)   │  │   (React/Vite)      │ │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘ │
└───────────┼────────────────────┼──────────────────────┼────────────┘
            │                    │                      │
            └────────────────────┼──────────────────────┘
                                 │ HTTPS / JSON
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          API GATEWAY LAYER                          │
│                 Laravel 12 Application (Render)                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────┐  │
│  │  Auth Layer  │ │  CRUD APIs   │ │  Public API  │ │  Uploads  │  │
│  │   Sanctum    │ │  Resources   │ │   Caching    │ │  Cloudinary│  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └───────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA & STORAGE LAYER                         │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────────┐    │
│  │    MySQL    │  │   Redis     │  │      Object Storage      │    │
│  │  (Render)   │  │   (Cache/   │  │  Cloudinary / Local Disk │    │
│  │             │  │   Sessions) │  │                          │    │
│  └─────────────┘  └─────────────┘  └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Application Split
The frontend is split into three conceptual apps served from one Vite/React codebase:

| App | Route | Purpose |
|-----|-------|---------|
| Marketing | `/` | Landing, pricing, features, auth entry |
| Dashboard | `/app/*` | Authenticated user workspace |
| Public Portfolio | `/{username}` | Read-only public portfolio |

### 2.2 Tech Rationale
- **React + TypeScript:** Type safety and component reusability.
- **Vite:** Fast dev server and optimized production builds.
- **Tailwind CSS:** Utility-first styling with design tokens.
- **React Router v6:** Declarative routing, nested layouts, loaders.
- **Framer Motion:** Smooth transitions and template animations.
- **React Query / TanStack Query:** Server state caching, mutations, optimistic updates.
- **Zustand:** Lightweight client state for auth and UI preferences.
- **Axios:** HTTP client with interceptors for auth tokens.

### 2.3 Frontend Layers

```
src/
├── main.tsx                 # App entry + router
├── App.tsx                  # Router configuration
├── features/                # Domain-driven modules
├── templates/               # Portfolio template components
├── shared/                  # UI kit, hooks, utils
├── lib/                     # API client, query client
└── types/                   # Global TypeScript contracts
```

---

## 3. Backend Architecture

### 3.1 Laravel Application Structure
- **Version:** Laravel 12
- **PHP:** 8.2+
- **Pattern:** Resource controllers + Form Request validation + API Resources
- **Auth:** Laravel Sanctum SPA token authentication
- **API Style:** RESTful JSON

### 3.2 Key Backend Layers

```
app/
├── Http/
│   ├── Controllers/Api/     # API controllers
│   ├── Requests/            # Form request validation classes
│   ├── Resources/           # API response transformers
│   └── Middleware/          # Auth, CORS, rate limiting
├── Models/                  # Eloquent models
├── Policies/                # Authorization rules
├── Services/                # Business logic
├── Repositories/            # Data access abstraction (optional)
├── Mail/                    # Notification mailables
└── Providers/               # Auth, route, event providers
```

### 3.3 Design Decisions
| Decision | Rationale |
|----------|-----------|
| Sanctum over Passport | Simpler SPA/API token model |
| API Resources | Consistent response shape, hide internal fields |
| Form Requests | Centralized validation rules |
| Policies | Fine-grained authorization per resource |
| Service Layer | Keeps controllers thin; reusable business logic |

---

## 4. Authentication Flow

```
┌─────────┐                          ┌─────────┐
│  Client │ ──(1) POST /register────▶│ Laravel │
│         │ ◀──(2) 201 + token───────│ Sanctum │
│         │                          └────┬────┘
│         │ ──(3) Store token in httpOnly │
│         │     cookie / secure storage     │
│         │                               │
│         │ ──(4) Authenticated requests──┤
│         │     Bearer <token>            │
│         │ ◀──(5) 200 / 403─────────────┘
└─────────┘
```

- Tokens issued by Sanctum.
- Frontend stores token in `httpOnly` cookie or secure memory with refresh strategy.
- Protected routes use `auth:sanctum` middleware.

---

## 5. Public Portfolio Rendering Strategy

### 5.1 Option A: Client-Side Rendered (MVP)
- Public portfolio fetches user data via `GET /api/public/portfolios/{username}`.
- React hydrates template with data.
- SEO handled via React Helmet Async + pre-rendered meta if using Vercel Prerender.

### 5.2 Option B: Server-Side Rendered (Phase 2)
- Use a lightweight SSR service (e.g., Vercel edge function or Laravel Inertia) to render HTML.
- Better SEO and social sharing.

**Recommendation:** Start with Option A for speed, but design templates so data fetching is isolated and replaceable with SSR later.

---

## 6. Storage Architecture

| Asset Type | Storage | Notes |
|------------|---------|-------|
| Profile pictures | Cloudinary (or local) | Auto-optimized variants |
| Project images | Cloudinary | Multiple sizes via transformations |
| Resumes | Cloudinary / S3 | Secure signed download URLs |
| Static template assets | Vercel CDN | SVG, fonts, CSS |

### 6.1 Image Handling
- Upload to backend → stream to Cloudinary → store public_id/URL in DB.
- Return optimized URLs (`f_auto,q_auto,w_800`).
- Fallback to local disk in development.

---

## 7. Caching Strategy

| Cache Target | Driver | TTL | Invalidation |
|--------------|--------|-----|--------------|
| Public portfolio data | Redis | 5 min | On profile update |
| Template list | Redis | 1 hour | Manual / deploy |
| Auth sessions | Redis / DB | Configurable | Logout |
| Rate limits | Redis | 1 min | Auto |

---

## 8. Security Architecture

| Layer | Control |
|-------|---------|
| Transport | TLS 1.2+ everywhere |
| Auth | Sanctum tokens, bcrypt passwords |
| Input | Form request validation, parameterized queries via Eloquent |
| Uploads | MIME whitelist, size limits, Cloudinary virus scanning |
| CORS | Restricted to allowed origins |
| Rate limiting | Login (5/min), contact (10/hour), upload (10/hour) |
| XSS | Escape output, sanitize rich text |
| CSRF | Sanctum CSRF protection for SPA, tokens for API |

---

## 9. Deployment Architecture

| Component | Provider | Service |
|-----------|----------|---------|
| Frontend | Vercel | Serverless React deployment |
| Backend | Render | Web service running Laravel |
| Database | Render | Managed MySQL |
| Cache | Render / Upstash | Redis (optional at launch) |
| Object Storage | Cloudinary | Images + resumes |
| DNS | Vercel / Cloudflare | Custom domain (Phase 2) |

### 9.1 Environment Diagram

```
User ──▶ Vercel Edge ──▶ API on Render ──▶ MySQL on Render
              │                │
              ▼                ▼
         Static Assets    Cloudinary
```

---

## 10. Scalability Considerations

- Stateless API servers enable horizontal scaling on Render.
- Database read replicas for public portfolio traffic (Phase 2).
- CDN for all static assets and images.
- Cache public portfolio responses aggressively.
- Use database indexes on `users.username`, `portfolios.user_id`, `inquiries.portfolio_id`.

---

## 11. Monitoring & Observability

| Tool | Purpose |
|------|---------|
| Laravel Telescope (dev) | Debug requests, exceptions, queries |
| Sentry | Error tracking |
| Vercel Analytics | Web vitals |
| Render metrics | CPU, memory, DB connections |
| Cloudinary | Bandwidth and transformation usage |
