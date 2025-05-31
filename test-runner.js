import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.test.js', '**/*test.js'],
    exclude: ['node_modules/**', 'docs/**', 'out/**'],
    testTimeout: 10000,
    globals: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'docs/',
        'out/',
        '**/*.test.js',
        '**/*test.js',
        'example.js'
      ]
    },
    outputFile: {
      json: './test-results.json'
    }
  }
});