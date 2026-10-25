import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))
const entryPoints = ['index', 'math', 'string'].map((name) => here(`../lib/${name}.ts`))

await build({
  entryPoints,
  bundle: true,
  external: ['react'],
  format: 'esm',
  outdir: here('../dist/lib/esm/'),
})

await build({
  entryPoints,
  bundle: true,
  external: ['react'],
  format: 'cjs',
  outExtension: { '.js': '.cjs' },
  outdir: here('../dist/lib/cjs/'),
})
