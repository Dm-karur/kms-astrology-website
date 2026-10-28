import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'favicon.ico',
        'favicon.webp',
        'favicon.svg',
        'icons.svg',
        'images/favicon-kms-astro.webp',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png',
      ],
      manifest: {
        name: 'KMS ஜோதிடம் - நிர்வாகி போர்டல்',
        short_name: 'KMS நிர்வாகி',
        description: 'KMS ஜோதிட ஆலோசனைக் கோரிக்கைகள் மற்றும் நிர்வாக மேலாண்மை செயலி',
        theme_color: '#38251D',
        background_color: '#38251D',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/admin',
        lang: 'ta',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff,woff2}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
})
