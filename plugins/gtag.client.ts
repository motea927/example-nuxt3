export default defineNuxtPlugin(({ provide }) => {
  const { GA_ID } = useRuntimeConfig().public
  if (process.env.NODE_ENV !== 'production') {
    provide('gtag', () => {})
    return
  }

  window.dataLayer = window.dataLayer || []

  function gtag(..._args: any) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }

  provide('gtag', gtag)
  gtag('js', new Date())
  gtag('config', GA_ID, JSON.stringify({}, null, 2))

  useRouter().afterEach((to) => {
    gtag('config', GA_ID, {
      page_path: to.fullPath,
      location_path: window.location.origin + to.fullPath,
    })
  })
})
