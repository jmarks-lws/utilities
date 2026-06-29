import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // jest-compatible globals (describe/test/expect) so existing tests need no imports
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      // V8 coverage — avoids babel-plugin-istanbul (the source of the js-yaml advisory chain)
      provider: 'v8',
      include: ['src/**/*.ts'],
    },
  },
});
