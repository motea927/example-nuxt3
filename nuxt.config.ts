import eslint from 'vite-plugin-eslint'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  vite: {
    plugins: [eslint()],
  },
  modules: [
    (_inlineOptions, nuxt) => {
      const { GA_ID = '' } = nuxt.options.runtimeConfig.public
      nuxt.options.app.head.script = nuxt.options.app.head.script || []
      nuxt.options.app.head.script.unshift({
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
        async: true,
      })
    },
  ],
})
