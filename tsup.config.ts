import { defineConfig } from 'tsup';


export default defineConfig({
  entry:     ['src/index.ts'],
  format:    ['cjs', 'esm'],
  dts:       true,
  minify:    false,
  clean:     true,
  splitting: false,
  external:  ['next/link', 'next/navigation', 'react'],
  banner:    {
    js: '"use client";',
  }
});