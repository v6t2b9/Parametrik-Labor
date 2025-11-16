# Deployment Guide

This guide covers deploying Parametrik-Labor to various platforms with full PWA support.

## Table of Contents

- [Quick Deployment](#quick-deployment)
- [Platform-Specific Guides](#platform-specific-guides)
- [PWA Configuration](#pwa-configuration)
- [Environment Variables](#environment-variables)
- [Build Configuration](#build-configuration)
- [CI/CD](#cicd)
- [Domain and HTTPS](#domain-and-https)
- [Performance Optimization](#performance-optimization)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## Quick Deployment

### Build for Production

```bash
# Install dependencies
npm install

# Build the app
npm run build

# Preview the build locally
npm run preview
```

The build outputs to `dist/` directory.

---

## Platform-Specific Guides

### Vercel (Recommended)

**One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/v6t2b9/Parametrik-Labor)

**Manual Deployment:**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure (optional):**
   - Project already includes `vercel.json`
   - Auto-deploys on git push to main branch
   - Custom domain: Vercel dashboard → Domains

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Netlify

1. **Connect Repository:**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Select your repository

2. **Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [[headers]]
     for = "/sw.js"
     [headers.values]
       Cache-Control = "no-cache"
       Service-Worker-Allowed = "/"

   [[headers]]
     for = "/*.js"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"

   [[headers]]
     for = "/*.css"
     [headers.values]
       Cache-Control = "public, max-age=31536000, immutable"
   ```

### GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

2. **Add scripts to `package.json`:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Set base path** (if using project pages):
   ```bash
   VITE_BASE_PATH=/your-repo-name/ npm run deploy
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Repository → Settings → Pages
   - Source: gh-pages branch

### Cloudflare Pages

1. **Connect Repository:**
   - Cloudflare dashboard → Pages → Create project
   - Connect your GitHub repository

2. **Build Settings:**
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** Add `NODE_VERSION = 18`

3. **Configure `_headers` file:**
   Create `public/_headers`:
   ```
   /sw.js
     Cache-Control: no-cache
     Service-Worker-Allowed: /

   /*.js
     Cache-Control: public, max-age=31536000, immutable

   /*.css
     Cache-Control: public, max-age=31536000, immutable
   ```

### Self-Hosting

See [SELF_HOSTING.md](../SELF_HOSTING.md) for comprehensive self-hosting guide with:
- Nginx configuration
- Apache configuration
- Docker deployment
- Subdirectory deployment

---

## PWA Configuration

### What Gets Generated

When you run `npm run build`, the PWA plugin generates:

1. **Service Worker** (`sw.js`)
   - Caches all app assets
   - Enables offline functionality
   - Auto-updates when new version deployed

2. **Web App Manifest** (`manifest.webmanifest`)
   - App name, description, theme colors
   - App icons (192x192, 512x512)
   - Display mode (standalone)
   - Start URL and scope

3. **Registration Script** (`registerSW.js`)
   - Registers service worker
   - Handles auto-updates

### PWA Requirements

For PWA to work properly:

1. **HTTPS Required**
   - PWA features require secure context
   - localhost is exempt (for development)
   - All production deployments must use HTTPS

2. **Valid Manifest**
   - Must be served from same origin
   - Must include required fields (name, icons, start_url)
   - Icons must be accessible

3. **Service Worker**
   - Must be served with correct headers
   - Scope must match deployment path

### PWA Testing

**Lighthouse Audit:**
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

**Check PWA Status:**
1. Open DevTools
2. Application tab
3. Manifest section - verify all fields
4. Service Workers - verify registered and active

**Test Installation:**
- Desktop: Look for install icon in address bar
- Mobile: "Add to Home Screen" should appear

---

## Environment Variables

### Available Variables

Create a `.env` file (not committed to git):

```bash
# Base path for deployment
# Default: '/' (root)
# Example for subdirectory: '/apps/parametric/'
VITE_BASE_PATH=/

# Node environment (auto-set by Vite)
# 'development' or 'production'
NODE_ENV=production
```

### Platform-Specific Setup

**Vercel:**
- Project Settings → Environment Variables
- Add `VITE_BASE_PATH` if deploying to subdirectory

**Netlify:**
- Site Settings → Build & deploy → Environment
- Add variables with `VITE_` prefix

**GitHub Pages:**
- Use `.env.production` file (not committed)
- Or set in package.json scripts

**Self-Hosted:**
- Create `.env` file in project root
- Or set via shell: `VITE_BASE_PATH=/path/ npm run build`

---

## Build Configuration

### Vite Configuration

Located in `vite.config.ts`:

```typescript
export default defineConfig(() => {
  const base = process.env.VITE_BASE_PATH || '/'

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Parametric Explorer',
          short_name: 'ParamExplorer',
          theme_color: '#000000',
          // ...
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          // ...
        }
      })
    ]
  }
})
```

### Build Optimization

**Production Build Includes:**
- Minified JavaScript and CSS
- Tree-shaking (removes unused code)
- Code splitting (separate chunks)
- Asset optimization
- Source maps (for debugging)

**Build Analysis:**
```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  visualizer({ open: true })
]

# Build and view bundle analysis
npm run build
```

---

## CI/CD

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          VITE_BASE_PATH: ${{ secrets.VITE_BASE_PATH }}

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Download artifacts
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
image: node:18

stages:
  - build
  - deploy

cache:
  paths:
    - node_modules/

build:
  stage: build
  script:
    - npm ci
    - npm run lint
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy:
  stage: deploy
  only:
    - main
  script:
    - npm install -g vercel
    - vercel --prod --token $VERCEL_TOKEN
```

---

## Domain and HTTPS

### Custom Domain

**Vercel:**
1. Project → Settings → Domains
2. Add your domain
3. Configure DNS (A or CNAME records)
4. SSL auto-provisioned

**Netlify:**
1. Site → Domain settings
2. Add custom domain
3. Configure DNS
4. SSL auto-provisioned

**Self-Hosted:**
1. Use Let's Encrypt for free SSL:
   ```bash
   # Install certbot
   sudo apt install certbot python3-certbot-nginx

   # Get certificate
   sudo certbot --nginx -d yourdomain.com
   ```

### HTTPS Requirements

PWA requires HTTPS for:
- Service Worker registration
- Push notifications (if added)
- Secure credential storage
- Geolocation (if added)

**Exceptions:**
- `localhost` (development)
- `127.0.0.1` (development)

---

## Performance Optimization

### CDN Configuration

**Cloudflare:**
- Enable Auto Minify (JS, CSS, HTML)
- Enable Brotli compression
- Set cache rules for static assets

**Headers for Caching:**
```nginx
# Static assets (versioned files)
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Service worker (never cache)
location = /sw.js {
  add_header Cache-Control "no-cache";
}

# HTML (short cache)
location ~* \.html$ {
  expires 1h;
  add_header Cache-Control "public, must-revalidate";
}
```

### Asset Optimization

**Images:**
- Use WebP format where supported
- Provide multiple sizes
- Lazy load off-screen images

**Code Splitting:**
- Vite automatically splits vendor code
- Use dynamic imports for large components

**Compression:**
- Enable gzip/brotli on server
- Vite pre-compresses files

---

## Monitoring

### Error Tracking

**Sentry Integration:**
```bash
npm install @sentry/react
```

```typescript
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: import.meta.env.MODE
})
```

### Analytics

**Plausible (Privacy-friendly):**
```html
<!-- Add to index.html -->
<script defer data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js">
</script>
```

### Performance Monitoring

**Web Vitals:**
```bash
npm install web-vitals
```

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

---

## Troubleshooting

### Common Issues

**PWA Not Installing:**
- Verify HTTPS is enabled
- Check manifest.webmanifest is accessible
- Verify all icons load successfully
- Check service worker registration in DevTools
- Ensure no console errors

**Service Worker Not Updating:**
```javascript
// Force update
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister())
})
```

**Assets Not Loading (404):**
- Check `VITE_BASE_PATH` matches deployment path
- Verify paths in manifest and service worker
- Check server configuration for rewrites

**Build Fails:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (need 18+)
- Check for TypeScript errors: `npm run build`

**Performance Issues:**
- Enable compression on server
- Use CDN for static assets
- Optimize images
- Reduce bundle size

### Debug Checklist

- [ ] HTTPS enabled
- [ ] manifest.webmanifest accessible
- [ ] All icons load (check Network tab)
- [ ] Service worker registered (Application tab)
- [ ] No console errors
- [ ] Base path configured correctly
- [ ] Headers set correctly
- [ ] Lighthouse audit passes

---

## Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Self-Hosting Guide](../SELF_HOSTING.md)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Ready to deploy? Start with the [Quick Deployment](#quick-deployment) section!** 🚀
