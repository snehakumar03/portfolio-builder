# Portfolio Builder — Development Roadmap

## Phase 0 — Foundation (Weeks 1-2)

**Goal:** Working local development environment and project skeleton.

- [ ] Initialize frontend repo (Vite + React + TypeScript + Tailwind).
- [ ] Initialize backend repo (Laravel 12 + Sanctum).
- [ ] Set up MySQL database locally (Docker Compose).
- [ ] Configure CORS, environment variables, and CI skeleton.
- [ ] Create shared design tokens and base component library.
- [ ] Write README with setup instructions.

**Deliverables:**
- Repo scaffolding
- Local dev environment
- Base UI kit (Button, Input, Card)

---

## Phase 1 — Core Platform (Weeks 3-6)

### Sprint 1: Authentication & Onboarding (Week 3)
- [ ] Register / login UI and API.
- [ ] Forgot / reset password.
- [ ] Protected routes.
- [ ] Email verification (optional, can defer).

### Sprint 2: Dashboard & Profile Builder (Week 4)
- [ ] Dashboard layout and widgets.
- [ ] Profile CRUD with image upload.
- [ ] Username slug validation.
- [ ] Portfolio publish/unpublish.

### Sprint 3: Skills, Experience, Education (Week 5)
- [ ] Skills CRUD with categories.
- [ ] Experience CRUD.
- [ ] Education CRUD.
- [ ] Display ordering.

### Sprint 4: Projects & Resume (Week 6)
- [ ] Projects CRUD with images.
- [ ] Resume upload / preview / download.
- [ ] Template selection.

**Deliverables:**
- Fully functional authenticated dashboard.
- All core CRUD modules.
- Public portfolio generation.

---

## Phase 2 — Templates & Public Portfolio (Weeks 7-9)

### Sprint 5: Template Marketplace (Week 7)
- [ ] Build 5 launch templates.
- [ ] Template data contract.
- [ ] Template preview mode.
- [ ] Template database seeder.

### Sprint 6: Public Portfolio & SEO (Week 8)
- [ ] `/{username}` route.
- [ ] Template resolver.
- [ ] SEO meta tags and Open Graph.
- [ ] View count tracking.
- [ ] 404 handling.

### Sprint 7: Contact Form & Inquiries (Week 9)
- [ ] Public contact form.
- [ ] Inquiry storage and notifications.
- [ ] Inquiries dashboard.
- [ ] Spam protection.

**Deliverables:**
- Five polished templates.
- Public portfolio live.
- Contact system working.

---

## Phase 3 — Polish & Launch Prep (Weeks 10-12)

### Sprint 8: UI/UX Polish (Week 10)
- [ ] Responsive pass on all screens.
- [ ] Loading and empty states.
- [ ] Accessibility audit.
- [ ] Animation refinement.

### Sprint 9: Testing & Performance (Week 11)
- [ ] Unit and integration tests.
- [ ] API test suite.
- [ ] Image optimization.
- [ ] Security review.

### Sprint 10: Deployment & Documentation (Week 12)
- [ ] Deploy frontend to Vercel.
- [ ] Deploy backend to Render.
- [ ] Configure production MySQL.
- [ ] Seed templates in production.
- [ ] Final documentation pass.

**Deliverables:**
- Production-ready application.
- Deployed URLs.
- Complete documentation.

---

## Phase 4 — Growth Features (Post-Launch)

### Theme Customization
- [ ] Primary color picker per portfolio.
- [ ] Font family selection.
- [ ] Section reordering.

### Analytics
- [ ] Portfolio views over time.
- [ ] Top referrers.
- [ ] Resume download count.
- [ ] Inquiry analytics.

### Dark/Light Mode
- [ ] Per-template theme toggle.
- [ ] System preference detection.

### Custom Domain Support
- [ ] CNAME configuration.
- [ ] SSL certificate provisioning.
- [ ] Domain validation.

---

## Phase 5 — AI Features (Future)

- [ ] AI About Me generator (OpenAI).
- [ ] AI project description generator.
- [ ] AI skill summary generator.
- [ ] AI resume summary generator.
- [ ] Tone selection (professional, casual, creative).

---

## Milestone Timeline

| Milestone | Target Date | Key Deliverable |
|-----------|-------------|-----------------|
| Foundation | Week 2 | Local dev + skeleton |
| Auth Complete | Week 3 | Users can register/login |
| Profile Complete | Week 4 | Users can build profile |
| Content Modules | Week 6 | All CRUD modules done |
| Templates Live | Week 8 | Public portfolios live |
| MVP Complete | Week 10 | Contact + polish |
| QA Complete | Week 11 | Tests passing |
| Public Launch | Week 12 | Production deployment |
