import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))

await build({
  entryPoints: [{ in: here('../app/index.tsx'), out: 'app' }],
  outdir: here('../dist/'),
  bundle: true,
  splitting: true,
  format: 'esm',
  jsx: 'automatic',
  minify: true,
  sourcemap: true,
  treeShaking: true, // для проверки
})
