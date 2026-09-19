import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const { VITE_SITE_URL = '' } = loadEnv(mode, '.', 'VITE_')
  const siteUrl = VITE_SITE_URL ? new URL(VITE_SITE_URL).origin : ''

  return {
    plugins: [
      react(),
      {
        name: 'invitation-sharing',
        transformIndexHtml(html) {
          return {
            html,
            tags: [
              { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}/social-preview.png` }, injectTo: 'head' },
              { tag: 'meta', attrs: { name: 'twitter:image', content: `${siteUrl}/social-preview.png` }, injectTo: 'head' },
              ...(siteUrl ? [
                { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
                { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
              ] : []),
            ],
          }
        },
      },
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'script-defer',
        manifest: {
          id: '/',
          name: 'Coti & Nico · Nos casamos',
          short_name: 'Coti & Nico',
          description: 'Nuestra invitación de casamiento. Toda la información para acompañarnos en este día especial.',
          lang: 'es-AR',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
          cleanupOutdatedCaches: true,
          navigateFallback: '/index.html',
          globPatterns: [
            '**/*.{js,css,html}',
            'icons/*.png',
            'images/imagenes/*.{png,webp,gif}',
            'fonts/**/*.{ttf,otf}',
          ],
          runtimeCaching: [{
            urlPattern: /\/images\/imagenes\/Efecto\.mp3$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'invitation-audio',
              cacheableResponse: { statuses: [200] },
              rangeRequests: true,
              expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          }],
        },
      }),
    ],
  }
})
