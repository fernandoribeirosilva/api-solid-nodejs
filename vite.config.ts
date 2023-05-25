import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// este arquivo vai fazer com que o vitest recolhença as importações por exemplo @lib/...
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', 'prisma'], // o 1 paramento, vai ser o caminho dos testes que eu quero que tenha este ambiente novo, 2 paramento precisa ser o ultimo nome da pasta vitest-environment-prisma
    ],
  },
})
