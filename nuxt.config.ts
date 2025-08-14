// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      baseApi: "https://interview-api.azkivam.com/api/v1",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
