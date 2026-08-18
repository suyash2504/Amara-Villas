import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves the project from /<repo>/, so assets need a relative base.
  base: './',
  build: { assetsInlineLimit: 2048 },
})
