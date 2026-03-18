import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  integrations: [react()],
  env: {
    schema: {
      API_URL: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
})
