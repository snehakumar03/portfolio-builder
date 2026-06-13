# Portfolio Builder — Implementation Sequence

This document provides the exact order in which a developer should implement the application. Follow this sequence to avoid blockers and maintain a working build at each stage.

---

## Stage 0 — Environment Setup

1. **Create project root directory.**
2. **Initialize frontend:**
   ```bash
   npm create vite@latest frontend -- --template react-ts
   cd frontend
   npm install
   npm install react-router-dom @tanstack/react-query axios zustand framer-motion clsx tailwind-merge
   npm install -D tailwindcss postcss autoprefixer @types/node
   npx tailwindcss init -p
   ```
3. **Initialize backend:**
   ```bash
   composer create-project laravel/laravel backend
   cd backend
   composer require laravel/sanctum
   php artisan sanctum:install
   ```
4. **Set up Docker Compose for local MySQL:**
   ```yaml
   services:
     mysql:
       image: mysql:8.0
       environment:
         MYSQL_ROOT_PASSWORD: root
         MYSQL_DATABASE: portfolio_builder
       ports:
         - "3306:3306"
   ```
5. **Configure environment files (.env) for both frontend and backend.**
6. **Create docs folder** and add all PRD/architecture documents.
7. **Create GitHub repo** and push initial commits.

---

## Stage 1 — Database Schema

1. Run Laravel migrations in this order:
   - `users` (extend default migration with `username`).
   - `templates`.
   - `portfolios`.
   - `social_links`.
   - `skills`.
   - `experiences`.
   - `educations`.
   - `projects`.
   - `project_images`.
   - `resumes`.
   - `inquiries`.
   - `password_resets` (Laravel default).
2. Define Eloquent models with relationships.
3. Create `TemplateSeeder` and seed the five templates.
4. Run `php artisan migrate --seed`.
5. Verify schema in MySQL.

---

## Stage 2 — Backend Authentication

1. Create `RegisterRequest`, `LoginRequest`, `ForgotPasswordRequest`, `ResetPasswordRequest`.
2. Implement `AuthController`:
   - `register()`
   - `login()`
   - `logout()`
   - `forgotPassword()`
   - `resetPassword()`
   - `me()`
3. Configure Sanctum in `config/sanctum.php`.
4. Add auth routes in `routes/api.php`:
   ```php
   Route::post('/auth/register', [AuthController::class, 'register']);
   Route::post('/auth/login', [AuthController::class, 'login']);
   Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
   Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
   Route::middleware('auth:sanctum')->group(function () {
       Route::post('/auth/logout', [AuthController::class, 'logout']);
       Route::get('/auth/me', [AuthController::class, 'me']);
   });
   ```
5. Test with Postman or `curl`.

---

## Stage 3 — Frontend Authentication

1. Set up React Router with routes:
   - `/` marketing
   - `/login`
   - `/register`
   - `/forgot-password`
   - `/app/*` dashboard (protected)
2. Create `AuthLayout` and `DashboardLayout`.
3. Build `LoginPage`, `RegisterPage`, `ForgotPasswordPage`.
4. Create `apiClient.ts` with request interceptor adding Bearer token.
5. Create `authStore.ts` with Zustand.
6. Implement `useAuth` hook.
7. Add protected route component.
8. Test login flow end-to-end.

---

## Stage 4 — Profile Backend

1. Create `PortfolioController`.
2. Create `StoreProfileRequest`.
3. Create `PortfolioResource`.
4. Implement endpoints:
   - `GET /profile`
   - `PUT /profile`
   - `POST /profile/picture`
   - `PUT /profile/template`
   - `PUT /profile/publish`
5. Implement `UploadService` / `CloudinaryService`.
6. Add `PortfolioService::updateProfile()` to sync portfolio slug with username.
7. Test all endpoints.

---

## Stage 5 — Profile Frontend

1. Build dashboard layout with sidebar navigation.
2. Build `DashboardPage` with completion widget and stats.
3. Build `ProfileBuilderPage` form.
4. Integrate image upload preview.
5. Display public URL preview.
6. Add template selection card.
7. Add publish toggle.
8. Add toast notifications for save success/error.

---

## Stage 6 — Skills, Experience, Education

### Backend
1. Create controllers: `SkillController`, `ExperienceController`, `EducationController`.
2. Create form requests and resources for each.
3. Implement CRUD routes under auth middleware.

### Frontend
1. Build list pages for each module.
2. Build create/edit modals.
3. Add inline delete with confirmation.
4. Wire APIs with React Query.

---

## Stage 7 — Projects & Resume

### Backend
1. Implement `ProjectController` CRUD.
2. Implement project image upload/delete.
3. Implement `ResumeController` upload/get/delete.
4. Add download counter.

### Frontend
1. Build `ProjectsPage`.
2. Build project form with image gallery.
3. Build `ResumePage` with upload, preview, download.
4. Add Cloudinary image transformations.

---

## Stage 8 — Templates

1. Seed `templates` table.
2. Create `TemplateController` with list/get endpoints.
3. Define shared `PortfolioData` TypeScript interface.
4. Create template component packages:
   - `ModernDeveloperTemplate`
   - `MinimalPortfolioTemplate`
   - `CreativePortfolioTemplate`
   - `CorporatePortfolioTemplate`
   - `PremiumDarkTemplate`
5. Build `TemplatesPage` marketplace.
6. Implement template preview using sample data.

---

## Stage 9 — Public Portfolio

### Backend
1. Implement `PublicPortfolioController::show($username)`.
2. Add eager loading for all relationships.
3. Implement view tracking with IP-based rate limit.
4. Cache response for 5 minutes.

### Frontend
1. Add dynamic route `/:username`.
2. Build `PublicPortfolioPage` and `TemplateResolver`.
3. Fetch data from public API.
4. Add SEO component with Helmet.
5. Build 404 page.

---

## Stage 10 — Contact & Inquiries

### Backend
1. Create `inquiries` migration.
2. Implement public contact endpoint with validation.
3. Add rate limiting.
4. Implement owner inquiry CRUD.
5. Add `NewInquiryMail` mailable.

### Frontend
1. Build contact form component.
2. Add contact section to all templates.
3. Build `InquiriesPage` dashboard.
4. Add read/unread toggle.

---

## Stage 11 — Polish

1. Add loading skeletons to all list pages.
2. Add empty states.
3. Responsive pass with Tailwind breakpoints.
4. Add Framer Motion page transitions.
5. Accessibility audit (focus states, labels, ARIA).
6. Form validation UX improvements.

---

## Stage 12 — Testing

### Backend
1. Write feature tests for auth.
2. Write feature tests for profile CRUD.
3. Write feature tests for projects, skills, experience, education.
4. Write feature tests for public portfolio.
5. Write feature tests for contact form.

### Frontend
1. Set up Vitest + React Testing Library.
2. Write tests for shared components.
3. Write tests for auth forms.
4. Write tests for dashboard widgets.

---

## Stage 13 — Deployment

1. **Frontend:**
   - Connect repo to Vercel.
   - Set environment variables (`VITE_API_BASE_URL`).
   - Configure `vercel.json` for SPA fallback.
2. **Backend:**
   - Create Render web service.
   - Add MySQL database.
   - Set environment variables.
   - Run migrations and seeders.
3. **Domain/DNS:**
   - Point frontend domain to Vercel.
   - Configure backend subdomain (`api.portfolio-builder.com`).
4. **Monitoring:**
   - Add Sentry to frontend and backend.
   - Enable Vercel Analytics.

---

## Definition of Done per Stage

- [ ] Code committed and pushed.
- [ ] Stage works in local environment.
- [ ] Basic manual test passed.
- [ ] No console errors in frontend.
- [ ] No unhandled exceptions in backend logs.
- [ ] Documentation updated if schema or API changed.
