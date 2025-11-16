# Self-Hosting Guide

This guide explains how to self-host the Parametric Explorer application with full PWA support.

## Quick Start

### Standard Root Deployment

If deploying to the root of your domain (e.g., `https://yourdomain.com/`):

```bash
npm install
npm run build
```

The built files will be in the `dist/` directory. Upload them to your web server.

### Subdirectory Deployment

If deploying to a subdirectory (e.g., `https://yourdomain.com/apps/parametric/`):

1. Create a `.env` file in the project root:
```bash
VITE_BASE_PATH=/apps/parametric/
```

2. Build the application:
```bash
npm run build
```

3. Upload the `dist/` directory contents to your server's `/apps/parametric/` path.

## Configuration Options

### Base Path

The `VITE_BASE_PATH` environment variable controls where the app is hosted:

- **Root deployment**: `VITE_BASE_PATH=/`
- **Subdirectory**: `VITE_BASE_PATH=/your-path/` (must end with `/`)

You can also set it during build:
```bash
VITE_BASE_PATH=/my-app/ npm run build
```

## Server Requirements

### Minimum Requirements

- Any static web server (nginx, Apache, Caddy, etc.)
- HTTPS support (required for PWA features)
- Modern browser support:
  - Chrome/Edge 90+
  - Firefox 88+
  - Safari 14+

### Recommended Server Configuration

#### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Root deployment
    root /var/www/parametric-explorer/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # PWA Service Worker must be served with correct headers
    location ~ ^/(sw|registerSW)\.js$ {
        add_header Cache-Control "no-cache";
        add_header Service-Worker-Allowed "/";
    }

    # Cache static assets
    location ~* \.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache (.htaccess)

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# PWA Service Worker headers
<FilesMatch "^(sw|registerSW)\.js$">
    Header set Cache-Control "no-cache"
    Header set Service-Worker-Allowed "/"
</FilesMatch>

# Cache static assets
<FilesMatch "\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
```

## PWA Features

### Installation

Once deployed with HTTPS, users can:
- Install the app from their browser (look for install icon in address bar)
- Add to home screen on mobile devices
- Use the app offline after initial load

### Offline Support

The app automatically caches:
- All JavaScript, CSS, and HTML files
- Icons and images
- Font files

### Service Worker

The service worker updates automatically when you deploy new versions.

## Testing Locally

Test the built app locally:

```bash
npm run build
npm run preview
```

The preview server will run at `http://localhost:4173` (or next available port).

**Note**: PWA install prompts require HTTPS. For local testing with HTTPS:

```bash
# Using mkcert (recommended)
mkcert -install
mkcert localhost

# Then configure preview server for HTTPS
```

## Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t parametric-explorer .
docker run -p 80:80 parametric-explorer
```

## Troubleshooting

### PWA Not Installing

- Ensure you're using HTTPS
- Check browser console for service worker errors
- Verify manifest.webmanifest is accessible
- Check that all icons are loading correctly

### Assets Not Loading (404 errors)

- Verify `VITE_BASE_PATH` matches your deployment path
- Ensure it ends with `/` for subdirectory deployments
- Check server configuration for correct root directory

### Service Worker Not Updating

- Clear browser cache
- Unregister old service worker in DevTools > Application > Service Workers
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_BASE_PATH` | `/` | Base URL path for the application |

## Security Considerations

- Always use HTTPS in production
- Keep dependencies updated: `npm audit` and `npm update`
- Configure Content Security Policy headers if needed
- Consider rate limiting for API endpoints (if added)

## Support

For issues and questions:
- Check the [GitHub Issues](https://github.com/v6t2b9/Parametrik-Labor/issues)
- Review browser console for error messages
- Ensure your hosting environment meets all requirements
