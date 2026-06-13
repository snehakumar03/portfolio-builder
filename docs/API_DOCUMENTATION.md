# Portfolio Builder — API Documentation

**Base URL:** `https://api.portfolio-builder.com/api/v1`  
**Authentication:** `Authorization: Bearer {sanctum_token}`  
**Content-Type:** `application/json`

---

## 1. Authentication

### 1.1 Register
`POST /auth/register`

**Request:**
```json
{
  "name": "Sneha K",
  "email": "sneha@example.com",
  "username": "sneha",
  "password": "SecurePass123!",
  "password_confirmation": "SecurePass123!"
}
```

**Validation Rules:**
- `name`: required, string, max 120
- `email`: required, email, unique:users
- `username`: required, alpha_dash, min 3, max 30, unique:users, regex `/^[a-z0-9_-]+$/`
- `password`: required, min 8, confirmed

**Response 201:**
```json
{
  "data": {
    "id": 1,
    "name": "Sneha K",
    "email": "sneha@example.com",
    "username": "sneha",
    "token": "1|laravel_sanctum_token..."
  }
}
```

### 1.2 Login
`POST /auth/login`

**Request:**
```json
{
  "email": "sneha@example.com",
  "password": "SecurePass123!"
}
```

**Response 200:**
```json
{
  "data": {
    "id": 1,
    "name": "Sneha K",
    "email": "sneha@example.com",
    "username": "sneha",
    "token": "1|laravel_sanctum_token..."
  }
}
```

### 1.3 Forgot Password
`POST /auth/forgot-password`

**Request:**
```json
{
  "email": "sneha@example.com"
}
```

**Response 200:**
```json
{
  "message": "If this email exists, a reset link has been sent."
}
```

### 1.4 Reset Password
`POST /auth/reset-password`

**Request:**
```json
{
  "email": "sneha@example.com",
  "token": "reset_token",
  "password": "NewPass123!",
  "password_confirmation": "NewPass123!"
}
```

**Response 200:**
```json
{
  "message": "Password reset successfully."
}
```

### 1.5 Logout
`POST /auth/logout`  
**Auth required.**

**Response 200:**
```json
{
  "message": "Logged out successfully."
}
```

### 1.6 Me
`GET /auth/me`  
**Auth required.**

**Response 200:**
```json
{
  "data": {
    "id": 1,
    "name": "Sneha K",
    "email": "sneha@example.com",
    "username": "sneha"
  }
}
```

---

## 2. Profile

### 2.1 Get My Portfolio Profile
`GET /profile`  
**Auth required.**

**Response 200:**
```json
{
  "data": {
    "id": 1,
    "slug": "sneha",
    "full_name": "Sneha K",
    "role": "Full Stack Engineer",
    "headline": "I build scalable web applications.",
    "about": "...",
    "profile_picture_url": "https://...",
    "email": "sneha@example.com",
    "phone": "+1...",
    "location": "San Francisco, CA",
    "is_published": true,
    "view_count": 1240,
    "template_id": 1,
    "social_links": [
      { "platform": "linkedin", "url": "https://linkedin.com/in/sneha" },
      { "platform": "github", "url": "https://github.com/sneha" }
    ]
  }
}
```

### 2.2 Update Profile
`PUT /profile`  
**Auth required.**

**Request:**
```json
{
  "full_name": "Sneha K",
  "role": "Senior Full Stack Engineer",
  "headline": "...",
  "about": "...",
  "email": "sneha@example.com",
  "phone": "+1...",
  "location": "San Francisco, CA",
  "social_links": [
    { "platform": "linkedin", "url": "https://linkedin.com/in/sneha" },
    { "platform": "github", "url": "https://github.com/sneha" }
  ]
}
```

**Response 200:** returns updated profile.

### 2.3 Upload Profile Picture
`POST /profile/picture`  
**Auth required. Content-Type: multipart/form-data**

**Request:**
- `image`: file (jpg, png, webp, max 2MB)

**Response 200:**
```json
{
  "data": {
    "profile_picture_url": "https://res.cloudinary.com/.../sneha.jpg"
  }
}
```

### 2.4 Select Template
`PUT /profile/template`  
**Auth required.**

**Request:**
```json
{
  "template_id": 1
}
```

**Response 200:** returns updated profile with template.

### 2.5 Publish / Unpublish
`PUT /profile/publish`  
**Auth required.**

**Request:**
```json
{
  "is_published": true
}
```

**Response 200:** returns updated profile.

---

## 3. Skills

### 3.1 List Skills
`GET /skills`  
**Auth required.**

**Response 200:**
```json
{
  "data": [
    { "id": 1, "name": "React", "category": "frontend", "display_order": 1 }
  ]
}
```

### 3.2 Create Skill
`POST /skills`  
**Auth required.**

**Request:**
```json
{
  "name": "React",
  "category": "frontend"
}
```

**Validation:** `name` required, max 100; `category` required, in `frontend,backend,database,devops,ai,tools`.

**Response 201:** created skill.

### 3.3 Update Skill
`PUT /skills/{id}`  
**Auth required.**

### 3.4 Delete Skill
`DELETE /skills/{id}`  
**Auth required.**

**Response 204.**

---

## 4. Projects

### 4.1 List Projects
`GET /projects`  
**Auth required.**

### 4.2 Create Project
`POST /projects`  
**Auth required.**

**Request:**
```json
{
  "title": "E-commerce Platform",
  "description": "...",
  "technologies": "React, Laravel, MySQL",
  "github_url": "https://github.com/...",
  "live_url": "https://..."
}
```

**Validation:** `title` required, max 200; URLs nullable, valid URL format.

### 4.3 Update Project
`PUT /projects/{id}`  
**Auth required.**

### 4.4 Delete Project
`DELETE /projects/{id}`  
**Auth required.**

### 4.5 Upload Project Images
`POST /projects/{id}/images`  
**Auth required. multipart/form-data**

**Request:**
- `images[]`: array of files, max 5, max 2MB each

**Response 200:**
```json
{
  "data": [
    { "id": 1, "image_url": "https://...", "display_order": 1 }
  ]
}
```

### 4.6 Delete Project Image
`DELETE /projects/{id}/images/{image_id}`  
**Auth required.**

---

## 5. Experience

### 5.1 List Experiences
`GET /experiences`  
**Auth required.**

### 5.2 Create Experience
`POST /experiences`  
**Auth required.**

**Request:**
```json
{
  "company": "Tech Corp",
  "position": "Senior Engineer",
  "start_date": "2022-01-01",
  "end_date": "2024-06-01",
  "is_current": false,
  "description": "..."
}
```

**Validation:** `company`, `position`, `start_date` required; `is_current` boolean; `end_date` after `start_date` unless current.

### 5.3 Update / Delete
`PUT /experiences/{id}`  
`DELETE /experiences/{id}`

---

## 6. Education

### 6.1 List Educations
`GET /educations`  
**Auth required.**

### 6.2 Create Education
`POST /educations`  
**Auth required.**

**Request:**
```json
{
  "institution": "Stanford University",
  "degree": "M.S. Computer Science",
  "year": "2020",
  "description": "..."
}
```

### 6.3 Update / Delete
`PUT /educations/{id}`  
`DELETE /educations/{id}`

---

## 7. Resume

### 7.1 Upload Resume
`POST /resume`  
**Auth required. multipart/form-data**

**Request:**
- `resume`: PDF only, max 5MB

**Response 200:**
```json
{
  "data": {
    "file_url": "https://...",
    "original_name": "Sneha_Resume.pdf",
    "download_count": 0
  }
}
```

### 7.2 Get Resume
`GET /resume`  
**Auth required.**

### 7.3 Delete Resume
`DELETE /resume`  
**Auth required.**

---

## 8. Templates

### 8.1 List Templates
`GET /templates`

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "modern-developer",
      "name": "Modern Developer",
      "description": "...",
      "thumbnail_url": "https://...",
      "is_active": true
    }
  ]
}
```

### 8.2 Get Template
`GET /templates/{slug}`

---

## 9. Public Portfolio

### 9.1 Get Public Portfolio
`GET /public/portfolios/{username}`

**Response 200 (if published):**
```json
{
  "data": {
    "slug": "sneha",
    "full_name": "Sneha K",
    "role": "Full Stack Engineer",
    "headline": "...",
    "about": "...",
    "profile_picture_url": "...",
    "email": "...",
    "phone": "...",
    "location": "...",
    "template": "modern-developer",
    "view_count": 1240,
    "social_links": [...],
    "skills": [...],
    "projects": [...],
    "experiences": [...],
    "educations": [...],
    "resume": { "file_url": "..." }
  }
}
```

**Response 404** if not found or unpublished.

### 9.2 Record View
`POST /public/portfolios/{username}/views`

Called by public portfolio on load. Rate-limited to once per IP per hour.

**Response 200:** `{ "message": "View recorded" }`

---

## 10. Contact / Inquiries

### 10.1 Send Inquiry
`POST /public/portfolios/{username}/contact`

**Request:**
```json
{
  "name": "Recruiter",
  "email": "recruiter@company.com",
  "subject": "Job Opportunity",
  "message": "We have a role...",
  "honeypot": ""
}
```

**Validation:** all required except honeypot; email valid; message min 10, max 2000.

**Response 201:** `{ "message": "Message sent successfully." }`

### 10.2 List Inquiries (Owner)
`GET /inquiries`  
**Auth required.**

### 10.3 Get Inquiry
`GET /inquiries/{id}`  
**Auth required.**

### 10.4 Mark as Read
`PUT /inquiries/{id}/read`  
**Auth required.**

### 10.5 Delete Inquiry
`DELETE /inquiries/{id}`  
**Auth required.**

---

## 11. Error Responses

All errors follow this shape:

```json
{
  "message": "Validation failed.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

| Status | Meaning |
|--------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Server Error |
