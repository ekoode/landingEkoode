import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  // Se sobrescriben con NUXT_PUBLIC_WHATSAPP, NUXT_PUBLIC_INSTAGRAM y NUXT_PUBLIC_SITE_URL
  runtimeConfig: {
    public: {
      whatsapp: '',
      instagram: '',
      siteUrl: 'http://localhost:3000',
    },
  },

  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 600, 800], styles: ['normal'] },
      { name: 'IBM Plex Mono', provider: 'google', weights: [400, 500], styles: ['normal'] },
    ],
    defaults: { subsets: ['latin', 'latin-ext'] },
  },

  nitro: {
    prerender: { routes: ['/', '/sitemap.xml', '/robots.txt'], crawlLinks: false },
  },

  typescript: { strict: true },
})
