// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "./assets/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "./assets/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "./assets/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "./assets/site.webmanifest",
        },
      ],
      title: "Todos Vanka",
    },
  },
  css: ["~/assets/css/global.css"],
});
