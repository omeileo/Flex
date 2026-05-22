import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/node_modules/**', '**/index.ts', '**/build/**'],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: 'coverage'
    },
    exclude: ['**/node_modules/**', '**/index.ts', '**/build/**'],
    globals: false,
    restoreMocks: false
  },
  server: {
    port: 3008,
    host: true,
    watch: {
      usePolling: true
    }
  },
  plugins: [tsconfigPaths()]
})
