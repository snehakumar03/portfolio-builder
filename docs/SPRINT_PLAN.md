# Portfolio Builder — Sprint Planning

## Sprint Format

- **Sprint Duration:** 1 week
- **Team Size:** 1-2 full-stack developers (this plan assumes one senior full-stack lead)
- **Ceremonies:** Sprint planning, daily standups, sprint review, retro
- **Estimation:** Story points (Fibonacci: 1, 2, 3, 5, 8, 13)

---

## Sprint 1 — Authentication & Onboarding

**Goal:** Users can register, log in, and access protected dashboard pages.

### Backend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Set up Laravel Sanctum | 2 | Backend |
| Create users migration with username slug | 2 | Backend |
| Implement register endpoint | 3 | Backend |
| Implement login endpoint | 2 | Backend |
| Implement logout endpoint | 1 | Backend |
| Implement forgot/reset password | 3 | Backend |
| Configure CORS for frontend | 1 | Backend |

### Frontend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Set up React Router and layouts | 2 | Frontend |
| Build Login page UI | 3 | Frontend |
| Build Register page UI | 3 | Frontend |
| Implement auth API hooks | 3 | Frontend |
| Add protected route guards | 2 | Frontend |
| Build forgot password UI | 2 | Frontend |

### Acceptance Criteria
- [ ] User can register with email, username, password.
- [ ] User can log in and receives Sanctum token.
- [ ] Token persists across page reloads.
- [ ] Protected routes redirect unauthenticated users to login.
- [ ] Password reset email flow works.

---

## Sprint 2 — Dashboard & Profile Builder

**Goal:** Authenticated users see a dashboard and can build their profile.

### Backend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Create portfolios migration | 2 | Backend |
| Create social_links migration | 1 | Backend |
| Build profile GET/PUT endpoints | 3 | Backend |
| Implement profile picture upload | 3 | Backend |
| Add publish/unpublish endpoint | 2 | Backend |
| Implement username uniqueness validation | 2 | Backend |

### Frontend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Build dashboard layout and sidebar | 3 | Frontend |
| Build dashboard home widgets | 3 | Frontend |
| Build profile builder form | 5 | Frontend |
| Integrate profile image upload | 3 | Frontend |
| Show profile completion percentage | 3 | Frontend |
| Add public URL preview | 2 | Frontend |

### Acceptance Criteria
- [ ] Dashboard displays after login.
- [ ] User can update all profile fields.
- [ ] Profile picture uploads and previews.
- [ ] Profile completion updates dynamically.
- [ ] Public URL shows username.
- [ ] Publish toggle works.

---

## Sprint 3 — Skills, Experience, Education

**Goal:** Users can manage supporting resume content.

### Backend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Create skills migration | 1 | Backend |
| Create experiences migration | 1 | Backend |
| Create educations migration | 1 | Backend |
| Build CRUD endpoints for skills | 3 | Backend |
| Build CRUD endpoints for experiences | 3 | Backend |
| Build CRUD endpoints for educations | 3 | Backend |
| Add category enum validation | 1 | Backend |

### Frontend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Build Skills management page | 3 | Frontend |
| Build Experience management page | 3 | Frontend |
| Build Education management page | 3 | Frontend |
| Add reusable list item components | 2 | Frontend |
| Add create/edit modals | 3 | Frontend |
| Wire up CRUD APIs | 3 | Frontend |

### Acceptance Criteria
- [ ] User can add/edit/delete skills.
- [ ] User can add/edit/delete experiences.
- [ ] User can add/edit/delete educations.
- [ ] Lists display in defined order.
- [ ] Validation errors shown inline.

---

## Sprint 4 — Projects & Resume

**Goal:** Users can showcase projects and upload their resume.

### Backend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Create projects migration | 1 | Backend |
| Create project_images migration | 1 | Backend |
| Create resumes migration | 1 | Backend |
| Build project CRUD endpoints | 3 | Backend |
| Build project image upload/delete | 3 | Backend |
| Build resume upload endpoint | 2 | Backend |
| Add resume download tracking | 2 | Backend |

### Frontend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Build Projects page with list | 3 | Frontend |
| Build project create/edit form | 3 | Frontend |
| Add project image gallery upload | 3 | Frontend |
| Build Resume upload page | 3 | Frontend |
| Add resume preview and download | 2 | Frontend |
| Add template selection card | 2 | Frontend |

### Acceptance Criteria
- [ ] User can create projects with images.
- [ ] Project images display in gallery.
- [ ] Resume PDF uploads and previews.
- [ ] Resume download increments counter.

---

## Sprint 5 — Template Marketplace

**Goal:** Users can choose from 5 portfolio templates.

### Backend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Create templates migration + seeder | 2 | Backend |
| Build template list endpoint | 2 | Backend |
| Add template selection endpoint | 2 | Backend |

### Frontend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Design template data contract | 2 | Frontend |
| Build Template Marketplace page | 3 | Frontend |
| Build Modern Developer template | 5 | Frontend |
| Build Minimal Portfolio template | 3 | Frontend |
| Build Creative Portfolio template | 5 | Frontend |
| Build Corporate Portfolio template | 3 | Frontend |
| Build Premium Dark template | 5 | Frontend |

### Acceptance Criteria
- [ ] All 5 templates exist in database.
- [ ] Marketplace displays templates.
- [ ] User can select a template.
- [ ] Each template renders sample data.

---

## Sprint 6 — Public Portfolio & SEO

**Goal:** Public URLs render selected template with user data.

### Backend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Build public portfolio endpoint | 3 | Backend |
| Implement view count tracking | 2 | Backend |
| Handle unpublished/404 cases | 2 | Backend |
| Add caching for public endpoint | 2 | Backend |

### Frontend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Build `/{username}` route | 2 | Frontend |
| Build template resolver | 3 | Frontend |
| Fetch and render public data | 3 | Frontend |
| Add SEO meta tags | 2 | Frontend |
| Implement 404 page | 2 | Frontend |
| Add share/copy URL button | 1 | Frontend |

### Acceptance Criteria
- [ ] `/{username}` loads public portfolio.
- [ ] Correct template renders.
- [ ] SEO meta tags present.
- [ ] 404 for missing/unpublished portfolios.
- [ ] View count increments.

---

## Sprint 7 — Contact Form & Inquiries

**Goal:** Visitors can contact portfolio owners.

### Backend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Create inquiries migration | 1 | Backend |
| Build public contact endpoint | 3 | Backend |
| Add rate limiting and honeypot | 2 | Backend |
| Build inquiries CRUD for owner | 2 | Backend |
| Send notification email | 2 | Backend |

### Frontend Tasks

| Story | Points | Owner |
|-------|--------|-------|
| Build contact form component | 3 | Frontend |
| Add contact section to templates | 2 | Frontend |
| Build inquiries dashboard page | 3 | Frontend |
| Add read/unread states | 2 | Frontend |

### Acceptance Criteria
- [ ] Visitor can submit contact form.
- [ ] Owner sees inquiry in dashboard.
- [ ] Rate limiting prevents abuse.
- [ ] Honeypot catches basic bots.

---

## Sprint 8 — UI/UX Polish

**Goal:** Application feels polished and responsive.

| Story | Points | Owner |
|-------|--------|-------|
| Responsive pass on all pages | 5 | Frontend |
| Add loading skeletons | 3 | Frontend |
| Add empty states | 2 | Frontend |
| Animation refinement with Framer Motion | 3 | Frontend |
| Accessibility audit and fixes | 3 | Frontend |
| Toast notifications | 2 | Frontend |

---

## Sprint 9 — Testing & Performance

| Story | Points | Owner |
|-------|--------|-------|
| Write API feature tests | 5 | Backend |
| Write model unit tests | 3 | Backend |
| Write frontend component tests | 3 | Frontend |
| Image optimization review | 2 | Frontend |
| Security review | 3 | Backend |
| Lighthouse performance audit | 2 | Frontend |

---

## Sprint 10 — Deployment & Launch

| Story | Points | Owner |
|-------|--------|-------|
| Set up Vercel project | 2 | Frontend |
| Set up Render web service | 2 | Backend |
| Provision production MySQL | 2 | Backend |
| Configure production env vars | 2 | Both |
| Seed templates in production | 1 | Backend |
| Configure custom domain (optional) | 3 | Both |
| Write launch documentation | 2 | Both |

---

## Velocity Projection

Assuming one senior full-stack developer:

| Sprint | Story Points |
|--------|--------------|
| Sprint 1 | 24 |
| Sprint 2 | 26 |
| Sprint 3 | 26 |
| Sprint 4 | 27 |
| Sprint 5 | 30 |
| Sprint 6 | 20 |
| Sprint 7 | 22 |
| Sprint 8 | 18 |
| Sprint 9 | 18 |
| Sprint 10 | 16 |
| **Total** | **227** |

Estimated duration: **10 weeks** for MVP.
