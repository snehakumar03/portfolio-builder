# Portfolio Builder — Deployment Guide

## 1. Prerequisites

- GitHub account
- Vercel account
- Render account
- Cloudinary account (for image/resume storage)
- Domain name (optional for launch)

---

## 2. Environment Variables

### Frontend (.env.local → Vercel)

```env
VITE_API_BASE_URL=https://api.portfolio-builder.com/api/v1
VITE_APP_URL=https://portfolio-builder.com
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

### Backend (.env → Render)

```env
APP_NAME="Portfolio Builder"
APP_ENV=production
APP_KEY=base64:GENERATED_KEY
APP_DEBUG=false
APP_URL=https://api.portfolio-builder.com

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=RENDER_MYSQL_HOST
DB_PORT=3306
DB_DATABASE=portfolio_builder
DB_USERNAME=RENDER_MYSQL_USER
DB_PASSWORD=RENDER_MYSQL_PASSWORD

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=cloudinary
QUEUE_CONNECTION=sync
SESSION_DRIVER=database
SESSION_LIFETIME=120

REDIS_HOST=REDIS_HOST
REDIS_PASSWORD=REDIS_PASSWORD
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=MAIL_PROVIDER_HOST
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@portfolio-builder.com"
MAIL_FROM_NAME="Portfolio Builder"

SANCTUM_STATEFUL_DOMAINS=portfolio-builder.com
FRONTEND_URL=https://portfolio-builder.com

CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
CLOUDINARY_UPLOAD_PRESET=...
```

---

## 3. Backend Deployment on Render

### 3.1 Create Web Service
1. In Render dashboard, click **New → Web Service**.
2. Connect your GitHub repository.
3. Select the `backend` directory as root.
4. Runtime: **PHP** or use a **Docker** environment.

### 3.2 Build & Start Commands

**Build Command:**
```bash
composer install --no-dev --optimize-autoloader && php artisan config:cache && php artisan route:cache && php artisan view:cache
```

**Start Command:**
```bash
php artisan serve --host 0.0.0.0 --port 10000
```

For production, use a proper server like Nginx + PHP-FPM. Example `Dockerfile`:

```dockerfile
FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 10000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
```

### 3.3 Database Setup
1. Create **MySQL** database on Render.
2. Copy connection details into environment variables.
3. Run migrations and seeders:
   ```bash
   php artisan migrate --force
   php artisan db:seed --class=TemplateSeeder --force
   ```

### 3.4 Storage
1. Configure Cloudinary in Laravel.
2. Install Cloudinary adapter:
   ```bash
   composer require cloudinary-labs/cloudinary-laravel
   php artisan cloudinary:install
   ```
3. Set `FILESYSTEM_DISK=cloudinary`.

---

## 4. Frontend Deployment on Vercel

### 4.1 Create Project
1. In Vercel dashboard, click **Add New → Project**.
2. Import GitHub repository.
3. Set root directory to `frontend`.
4. Framework preset: **Vite**.

### 4.2 Build Settings

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist
```

### 4.3 Environment Variables
Add all `VITE_` prefixed variables in Vercel project settings.

### 4.4 SPA Routing
Create `vercel.json` in `frontend/`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 4.5 Dynamic Public Portfolio Routes
Since `/{username}` is dynamic, ensure React Router handles it. No additional Vercel config needed beyond SPA rewrite.

---

## 5. Domain Configuration

### 5.1 Frontend Custom Domain
1. In Vercel, go to **Project Settings → Domains**.
2. Add `portfolio-builder.com`.
3. Update DNS records as instructed by Vercel.

### 5.2 Backend Custom Subdomain
1. In Render, go to web service **Settings → Custom Domains**.
2. Add `api.portfolio-builder.com`.
3. Update DNS CNAME record.

### 5.3 CORS
Ensure backend `config/cors.php` allows the production frontend:

```php
'allowed_origins' => [
    env('FRONTEND_URL', 'http://localhost:5173'),
],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'allowed_methods' => ['*'],
'supports_credentials' => true,
```

---

## 6. SSL / HTTPS

- Vercel and Render both provision SSL automatically.
- Ensure all API calls use `https://`.
- Set `SESSION_SECURE_COOKIE=true` in production.

---

## 7. Post-Deployment Checklist

- [ ] Frontend loads at custom domain.
- [ ] Backend health endpoint returns 200.
- [ ] Registration creates user in production DB.
- [ ] Login returns token and dashboard is accessible.
- [ ] Profile picture uploads to Cloudinary.
- [ ] Public portfolio URL works for a published user.
- [ ] Contact form submits and inquiry appears in dashboard.
- [ ] 404 page works for missing usernames.
- [ ] Lighthouse score ≥ 90 on public portfolio.

---

## 8. Monitoring & Maintenance

| Task | Frequency | Tool |
|------|-----------|------|
| Error tracking | Continuous | Sentry |
| Performance | Weekly | Lighthouse / Vercel Analytics |
| Uptime | Continuous | Render monitoring |
| DB backups | Daily | Render managed backups |
| Dependency updates | Monthly | Dependabot |
| Security patches | As needed | Composer/npm audit |

---

## 9. Rollback Plan

1. Keep previous Docker image / Vercel deployment.
2. Use Render manual deploy from previous commit.
3. Use Vercel instant rollback to previous deployment.
4. Maintain database migrations as backward-compatible when possible.

---

## 10. Cost Estimate (Launch Scale)

| Service | Tier | Est. Monthly |
|---------|------|--------------|
| Vercel | Pro | $20 |
| Render Web Service | Starter | $7 |
| Render MySQL | Starter | $15 |
| Cloudinary | Free tier | $0 |
| Redis | Upstash free | $0 |
| Mail provider | Resend free | $0 |
| Domain | Registrar | ~$12/year |
| **Total** | | **~$42/month** |

Scale up Render and database tiers as traffic grows.
