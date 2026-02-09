import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
  external: ['next/link', 'next/navigation', 'react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";'
    };
  },
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js'
    };
  }
});