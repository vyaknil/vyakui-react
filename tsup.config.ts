import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  minify: true,
  clean: true,
  external: ['next/link', 'next/navigation', 'react'],
  banner: {
    js: '"use client";',
  },
});