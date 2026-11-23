// @ts-check
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  site: "https://mareabatemansbay.com.au",
  trailingSlash: "never",
  build: { format: "file" },
  // No sessions needed; stops the adapter requiring a SESSION KV binding.
  session: false,
  // Pages are prerendered; only /api/brochure runs on demand (prerender = false).
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [
    sitemap({ filter: (page) => !["/styleguide", "/brochure", "/thank-you"].some((p) => page.includes(p)) }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  vite: { plugins: [tailwindcss()] },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      RESEND_FROM: envField.string({
        context: "server",
        access: "public",
        default: "Marea Batemans Bay <hello@mareabatemansbay.com.au>",
      }),
      LEAD_RECIPIENTS: envField.string({
        context: "server",
        access: "public",
        default:
          "the.property.collective@mail.propertyshell.com,projects@thepropertycollective.com.au,nick.smith@characters.agency",
      }),
      BROCHURE_URL: envField.string({
        context: "server",
        access: "public",
        default: "https://mareabatemansbay.com.au/brochure",
      }),
      TURNSTILE_SECRET_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_GA_ID: envField.string({ context: "client", access: "public", optional: true }),
    },
  },
});
