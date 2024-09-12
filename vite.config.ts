import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,  // Use a different port for Vite
  },
  plugins: [nodePolyfills()],
})
