import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// este arquivo vai fazer com que o vitest recolhença as importações por exemplo @lib/...
export default defineConfig({
  plugins: [tsconfigPaths()],
})
