export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['leaflet/dist/leaflet.css'],
  runtimeConfig: {
    public: {
      apiUrl: 'https://directus-backend-production.up.railway.app' // ✅ removed /api
    }
  }
})
