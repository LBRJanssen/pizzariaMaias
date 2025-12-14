import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// config vite
export default defineConfig({
  base: '/pizzariaMaias/',
  plugins: [react()],
})
