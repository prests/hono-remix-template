/// <reference types="vitest" />

import devServer, { defaultOptions } from '@hono/vite-dev-server';
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  server: {
    host: 'local.example-test.com',
    port: 3_000,
    https: {
      key: './.cert/cert.key',
      cert: './.cert/cert.crt',
    },
    warmup: {
      clientFiles: [
        './src/remix-app/entry.client.tsx',
        './src/remix-app/root.tsx',
        './src/remix-app/routes/**/*',
        '!./app/routes/**/*.test.{ts,tsx}',
      ],
    },
  },
  optimizeDeps: {
    include: ['./src/remix-app/routes/**/*'],
  },
  plugins: [
    devServer({
      injectClientScript: false,
      entry: 'src/hono-server/server.ts',
      exclude: [...defaultOptions.exclude],
    }),
    !process.env.VITEST &&
      remix({
        ignoredRouteFiles: ['**/.*'],
        appDirectory: 'src/remix-app',
        serverModuleFormat: 'esm',
      }),
  ],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: [...configDefaults.exclude, '**/__tests__/**', '**/dist/**', '**/public/**'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
      reporter: ['lcov', 'json', 'html'],
    },
    reporters: ['default'],
  },
});
