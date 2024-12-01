import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**.ts'],
      exclude: ['src/adapters/**.ts', 'src/index.ts'],
      provider: 'istanbul',
    },
    environment: 'happy-dom',
    globals: true,
    include: ['tests/unit/**/*.test.ts'],
  },
});
