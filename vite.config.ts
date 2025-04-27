import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import istanbul from 'vite-plugin-istanbul'
import type { VitePWAOptions } from 'vite-plugin-pwa'

const vitePwaConfig: Partial<VitePWAOptions> = {
  base: '/schoofs-nv/',
  includeAssets: [
    'favicon.ico',
    'apple-touch-icon.png',
  ],
  injectRegister: 'auto',
  manifest: {
    name: 'Schoofs NV',
    background_color: '#ffffff',
    display: 'fullscreen',
    icons: [
      {
        sizes: '512x512',
        src: 'favicon_512x512.png',
        type: 'image/png',
      },
      {
        sizes: '192x192',
        src: 'favicon_192x192.png',
        type: 'image/png',
      },
    ],
    short_name: 'Schoofs NV',
    theme_color: 'rgb(23, 23, 23)',
  },
  registerType: 'autoUpdate',
  strategies: 'generateSW',
  workbox: {
    navigateFallbackDenylist: [
      /api/,
    ],
    runtimeCaching: [
      {
        handler: 'CacheFirst',
        options: {
          cacheableResponse: {
            statuses: [
              0,
              200,
            ], // cache responses with these statuses
          },
          cacheName: 's3-images',
          expiration: { maxAgeSeconds: 30 * 24 * 60 * 60 },
          matchOptions: { ignoreSearch: true },
        },
        urlPattern: ({ url }): boolean => url.origin.includes('.s3.'),
      },
    ],
  },
}

export default defineConfig({
  base: '/schoofs-nv/',
  plugins: [
    tailwindcss(),
    viteCompression(),
    // VitePWA(vitePwaConfig),
    istanbul({
      exclude: [
        'node_modules',
        'tests/',
        'src/configs',
        'src/utils',
        'src/libs',
        'src/plugins',
        'src/**/*.builder.ts',
        'src/constants',
        'src/mocks',
        'src/composables',
        'src/client',
      ],
      extension: [
        '.js',
        '.ts',
        '.vue',
      ],
      include: 'src/**/*',
      requireEnv: false,
    }),
    vue(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
})
