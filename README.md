# Portfolio Builder

**Tagline:** Create Stunning Portfolio Websites in Minutes.

Portfolio Builder is a production-ready SaaS application that allows users to create professional portfolio websites without coding. Users register, build their profile, select a template, and receive an instant public URL such as `portfolio-builder.com/sneha`.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Framer Motion |
| Backend | Laravel 13 (latest), PHP 8.3+, Laravel Sanctum |
| Database | MySQL 8 |
| Cache | Redis 7 |
| Storage | Local (development) / Cloudinary (production) |

---

## Project Structure

```
portfolio-builder/
├── docs/                  # Product & technical documentation
├── frontend/              # React SPA
├── backend/               # Laravel API
├── docker-compose.yml     # Local MySQL & Redis
└── README.md
```

---

## Quick Start

### Prerequisites

- Node.js 22+
- PHP 8.3+
- Composer
- Docker & Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/portfolio-builder.git
cd portfolio-builder
```

### 2. Start Local Services

```bash
docker-compose up -d
```

This starts MySQL on port `3307` and Redis on port `6380` to avoid conflicts with any host services.

### 3. Setup Backend

```bash
cd backend
cp .env.example .env          # if .env doesn't exist
composer install
php artisan key:generate
php artisan migrate
php artisan serve --port=8001
```

Backend will run at `http://localhost:8001`.

### 4. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`.

---

## Documentation

All product and technical documentation lives in `docs/`:

| Document | Description |
|----------|-------------|
| `PRD.md` | Product Requirements Document |
| `ARCHITECTURE.md` | System architecture and design decisions |
| `DATABASE_SCHEMA.md` | ER diagram, tables, relationships, indexes |
| `API_DOCUMENTATION.md` | Complete REST API specification |
| `FOLDER_STRUCTURE.md` | Frontend and backend folder layout |
| `WIREFRAMES.md` | Design system and wireframes |
| `ROADMAP.md` | Development phases and milestones |
| `SPRINT_PLAN.md` | Sprint-by-sprint planning |
| `IMPLEMENTATION_SEQUENCE.md` | Step-by-step build order |
| `DEPLOYMENT_GUIDE.md` | Production deployment instructions |

---

## Development Workflow

1. Follow `docs/IMPLEMENTATION_SEQUENCE.md` for the exact build order.
2. Create feature branches from `main`.
3. Write tests for backend features.
4. Open pull requests for review.
5. Merge only after CI passes.

---

## Useful Commands

### Frontend

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Backend

```bash
php artisan serve              # Start dev server
php artisan migrate:fresh --seed   # Reset DB and seed
php artisan test               # Run tests
php artisan route:list         # List routes
```

### Docker

```bash
docker-compose up -d       # Start services
docker-compose down -v     # Stop and remove volumes
docker logs portfolio-builder-mysql   # View MySQL logs
```

---

## Deployment

See `docs/DEPLOYMENT_GUIDE.md` for detailed instructions on deploying to:

- Frontend: Vercel
- Backend: Render
- Database: Render MySQL
- Storage: Cloudinary

---

## License

MIT

---

Built with ❤️ for developers, designers, freelancers, and job seekers.
