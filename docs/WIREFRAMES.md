# Portfolio Builder — UI Wireframes & Design System

## 1. Design System

### 1.1 Color Palette

**Primary Brand Colors**
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary-50` | `#eff6ff` | Light backgrounds |
| `--color-primary-100` | `#dbeafe` | Hover states |
| `--color-primary-500` | `#3b82f6` | Primary buttons, links |
| `--color-primary-600` | `#2563eb` | Button hover |
| `--color-primary-700` | `#1d4ed8` | Active states |

**Neutral Colors**
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gray-50` | `#f9fafb` | Page backgrounds |
| `--color-gray-100` | `#f3f4f6` | Cards, dividers |
| `--color-gray-200` | `#e5e7eb` | Borders |
| `--color-gray-500` | `#6b7280` | Secondary text |
| `--color-gray-700` | `#374151` | Body text |
| `--color-gray-900` | `#111827` | Headings |

**Semantic Colors**
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#10b981` | Success states |
| `--color-warning` | `#f59e0b` | Warnings |
| `--color-error` | `#ef4444` | Errors |
| `--color-info` | `#3b82f6` | Info |

### 1.2 Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 | Inter | 48px / 3rem | 800 | 1.1 |
| H2 | Inter | 36px / 2.25rem | 700 | 1.2 |
| H3 | Inter | 24px / 1.5rem | 600 | 1.3 |
| Body | Inter | 16px / 1rem | 400 | 1.6 |
| Small | Inter | 14px / 0.875rem | 400 | 1.5 |
| Caption | Inter | 12px / 0.75rem | 500 | 1.4 |

### 1.3 Spacing Scale

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

### 1.4 Border Radius

| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-full` | 9999px |

### 1.5 Shadows

| Token | Value |
|-------|-------|
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) |
| `--shadow-md` | 0 4px 6px rgba(0,0,0,0.07) |
| `--shadow-lg` | 0 10px 15px rgba(0,0,0,0.1) |
| `--shadow-xl` | 0 20px 25px rgba(0,0,0,0.12) |

### 1.6 Breakpoints

| Name | Width |
|------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

---

## 2. Component Library

### Core Components
- `Button` — primary, secondary, ghost, danger, sizes sm/md/lg, loading state
- `Input` — text, email, password, with label, error, helper text
- `Textarea` — auto-resize optional
- `Select` — single select, native fallback
- `Card` — surface with padding, shadow, hover lift
- `Modal` — centered dialog, focus trap
- `FileUpload` — drag-and-drop, preview, progress
- `Avatar` — image fallback to initials
- `Badge` — category pills
- `ProgressBar` — profile completion
- `Skeleton` — loading placeholders
- `Toast` — notification stack
- `EmptyState` — illustration + action
- `Tabs` — dashboard navigation
- `Seo` — helmet wrapper

---

## 3. Wireframes

### 3.1 Marketing Homepage

```
┌────────────────────────────────────────────────────────────┐
│  Logo              Features  Templates  Pricing   Login   Sign Up  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│     Create Stunning Portfolio Websites in Minutes          │
│     Build your professional presence without coding.       │
│                                                            │
│     [ Get Started — Free ]      [ View Templates ]         │
│                                                            │
│     [ Hero Illustration / Mockups ]                        │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  Features                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Easy    │  │  Fast    │  │  Custom  │  │  Share   │   │
│  │  Builder │  │  Publish │  │  Themes  │  │  Anywhere│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
├────────────────────────────────────────────────────────────┤
│  Templates Preview                                         │
│  [ Template 1 ] [ Template 2 ] [ Template 3 ] ...          │
├────────────────────────────────────────────────────────────┤
│  Footer                                                    │
└────────────────────────────────────────────────────────────┘
```

### 3.2 Login Page

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                    Portfolio Builder                       │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │  Welcome back                                        │   │
│  │  Email                                               │   │
│  │  [                                                ]  │   │
│  │  Password                                            │   │
│  │  [                                                ]  │   │
│  │  [ ] Remember me        Forgot password?             │   │
│  │  [              Sign In                          ]   │   │
│  │  Don't have an account? Sign up                      │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 3.3 Dashboard

```
┌────────────────────────────────────────────────────────────┐
│  Logo        Dashboard  Profile  Projects  Settings   User ▼│
├──────────────────┬─────────────────────────────────────────┤
│                  │  Welcome back, Sneha!                   │
│  Dashboard       │                                         │
│  Profile         │  ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  Skills          │  │ Profile  │ │ Portfolio│ │ Selected│ │
│  Projects        │  │ 75%      │ │ 1,240    │ │ Modern  │ │
│  Experience      │  └──────────┘ └──────────┘ └─────────┘ │
│  Education       │                                         │
│  Resume          │  Recent Updates                         │
│  Templates       │  • Updated profile picture              │
│  Inquiries       │  • Added new project "E-commerce"       │
│                  │  • Selected Minimal template            │
│                  │                                         │
│                  │  [ Edit Profile ] [ Preview Portfolio ] │
│                  │                                         │
└──────────────────┴─────────────────────────────────────────┘
```

### 3.4 Profile Builder

```
┌────────────────────────────────────────────────────────────┐
│  Dashboard  >  Profile Builder                              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Profile Picture                                           │
│  [ Avatar Preview ] [ Upload New ]                         │
│                                                            │
│  Full Name *              Role / Title *                   │
│  [                ]      [                ]                │
│                                                            │
│  Headline                                                  │
│  [                                                ]        │
│                                                            │
│  About                                                     │
│  [                                                ]        │
│  [                                                ]        │
│                                                            │
│  Email *              Phone              Location          │
│  [          ]         [          ]       [          ]      │
│                                                            │
│  LinkedIn             GitHub             Website           │
│  [          ]         [          ]       [          ]      │
│                                                            │
│  Public URL: portfolio-builder.com/sneha                   │
│                                                            │
│  [ Save Profile ]                                          │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 3.5 Skills Management

```
┌────────────────────────────────────────────────────────────┐
│  Dashboard  >  Skills                                       │
├────────────────────────────────────────────────────────────┤
│  [ Add Skill ]                                             │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │  React              Frontend            [Edit][Del]│   │
│  │  Laravel            Backend             [Edit][Del]│   │
│  │  MySQL              Database            [Edit][Del]│   │
│  │  Docker             DevOps              [Edit][Del]│   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 3.6 Projects Management

```
┌────────────────────────────────────────────────────────────┐
│  Dashboard  >  Projects                                     │
├────────────────────────────────────────────────────────────┤
│  [ Add Project ]                                           │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ [ Cover ]  E-commerce Platform                      │  │
│  │            React, Laravel, MySQL                    │  │
│  │            [ Edit ] [ Delete ] [ Manage Images ]    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ [ Cover ]  Task Management App                      │  │
│  │            Vue, Firebase                            │  │
│  │            [ Edit ] [ Delete ] [ Manage Images ]    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 3.7 Template Marketplace

```
┌────────────────────────────────────────────────────────────┐
│  Dashboard  >  Templates                                    │
├────────────────────────────────────────────────────────────┤
│  Choose a template for your portfolio                      │
│                                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ [Thumb]  │  │ [Thumb]  │  │ [Thumb]  │  │ [Thumb]  │   │
│  │ Modern   │  │ Minimal  │  │ Creative │  │ Corporate│   │
│  │ [Select] │  │ [Select] │  │ [Select] │  │ [Select] │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                            │
│  ┌──────────┐                                              │
│  │ [Thumb]  │                                              │
│  │ Premium  │                                              │
│  │ [Select] │                                              │
│  └──────────┘                                              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 3.8 Public Portfolio — Modern Developer Template

```
┌────────────────────────────────────────────────────────────┐
│  [ Dark Navbar ]                                           │
│  Sneha K              About  Skills  Projects  Contact     │
├────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐  │
│  │  [Avatar]  Hi, I'm Sneha K                          │  │
│  │            Full Stack Engineer                      │  │
│  │            I build scalable web applications.       │  │
│  │            [ LinkedIn ] [ GitHub ] [ Email ]        │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  About Me                                                  │
│  [Paragraph text...]                                       │
│                                                            │
│  Skills                                                    │
│  [ React ] [ Laravel ] [ MySQL ] [ Docker ] [ AI ]        │
│                                                            │
│  Projects                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │  [Image]   │  │  [Image]   │  │  [Image]   │           │
│  │  Project 1 │  │  Project 2 │  │  Project 3 │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│                                                            │
│  Experience                                                │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Tech Corp — Senior Engineer      2022 - Present    │  │
│  │  [Description]                                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  Contact Me                                                │
│  Name  Email  Subject  Message  [ Send Message ]           │
│                                                            │
│  Footer                                                    │
└────────────────────────────────────────────────────────────┘
```

---

## 4. Responsive Behavior

### Mobile (< 768px)
- Dashboard sidebar becomes bottom tab bar or hamburger menu.
- Template grid becomes single column.
- Public portfolio stacks all sections vertically.
- Tables become cards.

### Tablet (768px - 1024px)
- Dashboard sidebar collapses to icon-only rail.
- Template grid becomes two columns.

### Desktop (> 1024px)
- Full sidebar.
- Multi-column layouts.
- Hover states enabled.

---

## 5. Animation Guidelines

Use Framer Motion for:
- Page transitions (fade/slide).
- Dashboard cards entering viewport.
- Template preview hover lift.
- Public portfolio section reveals on scroll.
- Modal open/close.
- Toast notifications.

Defaults:
- Duration: 0.3s
- Easing: `[0.25, 0.1, 0.25, 1]`
- Stagger children: 0.05s
