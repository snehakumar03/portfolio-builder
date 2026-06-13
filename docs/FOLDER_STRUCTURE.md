# Portfolio Builder — Folder Structure

## 1. Repository Layout

```
portfolio-builder/
├── README.md
├── docker-compose.yml
├── Makefile
├── docs/                              # Product & technical documentation
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_DOCUMENTATION.md
│   ├── FOLDER_STRUCTURE.md
│   ├── WIREFRAMES.md
│   ├── ROADMAP.md
│   ├── SPRINT_PLAN.md
│   ├── IMPLEMENTATION_SEQUENCE.md
│   └── DEPLOYMENT_GUIDE.md
├── frontend/                          # React + Vite SPA
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   ├── favicon.ico
│   │   └── images/
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── router.tsx
│       ├── index.css
│       ├── features/
│       │   ├── auth/
│       │   │   ├── api/
│       │   │   │   ├── login.ts
│       │   │   │   ├── register.ts
│       │   │   │   ├── logout.ts
│       │   │   │   └── forgotPassword.ts
│       │   │   ├── components/
│       │   │   │   ├── LoginForm.tsx
│       │   │   │   ├── RegisterForm.tsx
│       │   │   │   └── AuthLayout.tsx
│       │   │   ├── hooks/
│       │   │   │   ├── useAuth.ts
│       │   │   │   └── useLogout.ts
│       │   │   ├── stores/
│       │   │   │   └── authStore.ts
│       │   │   ├── types/
│       │   │   │   └── auth.types.ts
│       │   │   └── pages/
│       │   │       ├── LoginPage.tsx
│       │   │       ├── RegisterPage.tsx
│       │   │       └── ForgotPasswordPage.tsx
│       │   ├── dashboard/
│       │   │   ├── api/
│       │   │   ├── components/
│       │   │   ├── hooks/
│       │   │   └── pages/
│       │   │       └── DashboardPage.tsx
│       │   ├── profile/
│       │   │   ├── api/
│       │   │   ├── components/
│       │   │   ├── hooks/
│       │   │   └── pages/
│       │   │       └── ProfileBuilderPage.tsx
│       │   ├── skills/
│       │   │   ├── api/
│       │   │   ├── components/
│       │   │   └── pages/
│       │   ├── projects/
│       │   │   ├── api/
│       │   │   ├── components/
│       │   │   └── pages/
│       │   ├── experience/
│       │   ├── education/
│       │   ├── resume/
│       │   ├── templates/
│       │   └── inquiries/
│       ├── templates/                 # Public portfolio templates
│       │   ├── modern-developer/
│       │   │   ├── ModernDeveloperTemplate.tsx
│       │   │   ├── components/
│       │   │   ├── styles/
│       │   │   └── types.ts
│       │   ├── minimal-portfolio/
│       │   ├── creative-portfolio/
│       │   ├── corporate-portfolio/
│       │   └── premium-dark/
│       ├── public-portfolio/
│       │   ├── api/
│       │   │   └── getPublicPortfolio.ts
│       │   ├── components/
│       │   ├── hooks/
│       │   │   └── usePublicPortfolio.ts
│       │   └── pages/
│       │       └── PublicPortfolioPage.tsx
│       ├── shared/
│       │   ├── components/
│       │   │   ├── Button.tsx
│       │   │   ├── Input.tsx
│       │   │   ├── Textarea.tsx
│       │   │   ├── Select.tsx
│       │   │   ├── Card.tsx
│       │   │   ├── Modal.tsx
│       │   │   ├── FileUpload.tsx
│       │   │   ├── Loader.tsx
│       │   │   ├── EmptyState.tsx
│       │   │   └── Seo.tsx
│       │   ├── hooks/
│       │   │   ├── useDebounce.ts
│       │   │   └── useScrollToTop.ts
│       │   ├── utils/
│       │   │   ├── formatDate.ts
│       │   │   ├── classNames.ts
│       │   │   └── validators.ts
│       │   ├── types/
│       │   │   └── index.ts
│       │   └── constants/
│       │       └── skillCategories.ts
│       ├── lib/
│       │   ├── apiClient.ts
│       │   ├── queryClient.ts
│       │   └── cloudinary.ts
│       ├── types/
│       │   ├── api.ts
│       │   └── portfolio.ts
│       └── assets/
│           ├── fonts/
│           └── images/
├── backend/                           # Laravel 12 API
│   ├── app/
│   │   ├── Console/
│   │   ├── Exceptions/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/
│   │   │   │       ├── v1/
│   │   │   │       │   ├── AuthController.php
│   │   │   │       │   ├── ProfileController.php
│   │   │   │       │   ├── SkillController.php
│   │   │   │       │   ├── ProjectController.php
│   │   │   │       │   ├── ExperienceController.php
│   │   │   │       │   ├── EducationController.php
│   │   │   │       │   ├── ResumeController.php
│   │   │   │       │   ├── TemplateController.php
│   │   │   │       │   ├── InquiryController.php
│   │   │   │       │   └── PublicPortfolioController.php
│   │   │   │       └── Controller.php
│   │   │   ├── Middleware/
│   │   │   ├── Requests/
│   │   │   │   ├── v1/
│   │   │   │   │   ├── LoginRequest.php
│   │   │   │   │   ├── RegisterRequest.php
│   │   │   │   │   ├── StoreProfileRequest.php
│   │   │   │   │   ├── StoreSkillRequest.php
│   │   │   │   │   ├── StoreProjectRequest.php
│   │   │   │   │   ├── StoreExperienceRequest.php
│   │   │   │   │   ├── StoreEducationRequest.php
│   │   │   │   │   ├── UploadResumeRequest.php
│   │   │   │   │   └── ContactInquiryRequest.php
│   │   │   ├── Resources/
│   │   │   │   ├── v1/
│   │   │   │   │   ├── UserResource.php
│   │   │   │   │   ├── PortfolioResource.php
│   │   │   │   │   ├── PublicPortfolioResource.php
│   │   │   │   │   ├── SkillResource.php
│   │   │   │   │   ├── ProjectResource.php
│   │   │   │   │   ├── ExperienceResource.php
│   │   │   │   │   ├── EducationResource.php
│   │   │   │   │   ├── ResumeResource.php
│   │   │   │   │   ├── TemplateResource.php
│   │   │   │   │   └── InquiryResource.php
│   │   │   └── Kernel.php
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Portfolio.php
│   │   │   ├── SocialLink.php
│   │   │   ├── Skill.php
│   │   │   ├── Project.php
│   │   │   ├── ProjectImage.php
│   │   │   ├── Experience.php
│   │   │   ├── Education.php
│   │   │   ├── Resume.php
│   │   │   ├── Template.php
│   │   │   └── Inquiry.php
│   │   ├── Policies/
│   │   │   ├── ProjectPolicy.php
│   │   │   ├── SkillPolicy.php
│   │   │   ├── ExperiencePolicy.php
│   │   │   ├── EducationPolicy.php
│   │   │   └── InquiryPolicy.php
│   │   ├── Providers/
│   │   ├── Services/
│   │   │   ├── PortfolioService.php
│   │   │   ├── UploadService.php
│   │   │   ├── CloudinaryService.php
│   │   │   └── InquiryService.php
│   │   └── Mail/
│   │       └── NewInquiryMail.php
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   │   ├── factories/
│   │   ├── migrations/
│   │   └── seeders/
│   │       ├── TemplateSeeder.php
│   │       └── DatabaseSeeder.php
│   ├── lang/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   │   └── api.php
│   ├── storage/
│   ├── tests/
│   │   ├── Feature/
│   │   │   ├── AuthTest.php
│   │   │   ├── ProfileTest.php
│   │   │   ├── ProjectTest.php
│   │   │   └── PublicPortfolioTest.php
│   │   └── Unit/
│   ├── artisan
│   ├── composer.json
│   ├── phpunit.xml
│   └── .env.example
└── .github/
    └── workflows/
        ├── frontend-ci.yml
        └── backend-ci.yml
```

---

## 2. Frontend Structure Rationale

### 2.1 Feature-Based Organization
Each domain (auth, dashboard, profile, skills, etc.) owns its own API calls, components, hooks, types, and pages. This keeps related code colocated and simplifies maintenance.

### 2.2 Templates as First-Class Modules
Templates live under `src/templates/` rather than inside components so each can have its own component tree, styles, and theme configuration. All templates share a common `PortfolioData` contract defined in `src/types/portfolio.ts`.

### 2.3 Shared Layer
The `shared/` directory contains the design system and reusable utilities. No business logic lives here.

### 2.4 Lib Layer
API client, React Query client, and third-party SDK wrappers (Cloudinary) are centralized in `lib/`.

---

## 3. Backend Structure Rationale

### 3.1 API Versioning
Controllers, requests, and resources are namespaced under `Api/v1` so future versions can coexist.

### 3.2 Fat Models, Thin Controllers
Business logic lives in service classes (`PortfolioService`, `UploadService`). Controllers delegate to services and return resources.

### 3.3 Validation Layer
Each write endpoint has a dedicated Form Request class. Validation stays out of controllers.

### 3.4 Resource Layer
API responses are shaped by resource classes, ensuring consistency and allowing field-level changes without touching controllers.

### 3.5 Policies
Authorization rules are explicit and testable via Laravel policies.

---

## 4. Service Layer Design

### 4.1 Frontend Service Layer
Instead of calling `apiClient` directly from components, create small API functions per feature:

```ts
// features/profile/api/updateProfile.ts
import { apiClient } from '@/lib/apiClient';
import { Profile } from '../types/profile.types';

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  const response = await apiClient.put('/profile', data);
  return response.data.data;
}
```

### 4.2 Backend Service Layer
```php
// app/Services/PortfolioService.php
class PortfolioService
{
    public function updateProfile(User $user, array $data): Portfolio
    {
        $portfolio = $user->portfolio ?: new Portfolio(['user_id' => $user->id]);
        $portfolio->fill($data);
        $portfolio->save();
        return $portfolio->load(['socialLinks', 'template']);
    }
}
```

---

## 5. Component Hierarchy Example

```
App
├── MarketingLayout
│   ├── Navbar
│   ├── Hero
│   ├── Features
│   └── Footer
├── DashboardLayout (protected)
│   ├── Sidebar
│   ├── Topbar
│   └── Outlet
│       ├── DashboardPage
│       ├── ProfileBuilderPage
│       ├── SkillsPage
│       ├── ProjectsPage
│       ├── ExperiencePage
│       ├── EducationPage
│       ├── ResumePage
│       ├── TemplatesPage
│       └── InquiriesPage
└── PublicPortfolioLayout
    └── PublicPortfolioPage
        └── TemplateResolver
            ├── ModernDeveloperTemplate
            ├── MinimalPortfolioTemplate
            ├── CreativePortfolioTemplate
            ├── CorporatePortfolioTemplate
            └── PremiumDarkTemplate
```
