// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxt/devtools', 'nuxt-icon'],
  css: ['@/assets/css/main.css'],
  ssr: true,
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
})
