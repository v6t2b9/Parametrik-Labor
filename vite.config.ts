import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(() => {
  // Base path for self-hosting (e.g., '/my-app/' or '/')
  // Set via VITE_BASE_PATH environment variable or default to '/'
  const base = process.env.VITE_BASE_PATH || '/'

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'gif.worker.js'],
        manifest: {
          name: 'Parametric Explorer',
          short_name: 'Parametric',
          description: 'Interactive parametric visualization and exploration tool with advanced export capabilities',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          display_override: ['standalone', 'fullscreen'],
          orientation: 'any',
          scope: base,
          start_url: base,
          categories: ['graphics', 'utilities', 'entertainment'],
          prefer_related_applications: false,
          dir: 'ltr',
          lang: 'en-US',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: 'apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png'
            }
          ],
          screenshots: [
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              form_factor: 'narrow'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              form_factor: 'wide'
            }
          ],
          shortcuts: [
            {
              name: 'New Visualization',
              short_name: 'New',
              description: 'Start a new parametric visualization',
              url: base,
              icons: [
                {
                  src: 'pwa-192x192.png',
                  sizes: '192x192'
                }
              ]
            }
          ],
          share_target: {
            action: base,
            method: 'GET',
            enctype: 'application/x-www-form-urlencoded',
            params: {
              title: 'title',
              text: 'text',
              url: 'url'
            }
          }
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,jpg,jpeg}'],
          navigateFallback: null, // Disable for better self-hosting compatibility
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB for large assets
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              // Cache canvas recordings and exports
              urlPattern: /\.(mp4|webm|gif)$/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'media-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true, // Enable PWA in dev mode for testing
          type: 'module',
          navigateFallback: 'index.html'
        }
      })
    ],
  }
})
