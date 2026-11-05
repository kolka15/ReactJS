import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))
const entryPoints = ['index', 'math', 'string'].map((name) => here(`../lib/${name}.ts`))

const shared = {
  entryPoints,
  bundle: true,
  external: ['react'],
  minify: true,
  sourcemap: true,
}

await Promise.all([
  build({ ...shared, format: 'esm', outdir: here('../dist/lib/esm/') }),
  build({ ...shared, format: 'cjs', outExtension: { '.js': '.cjs' }, outdir: here('../dist/lib/cjs/') }),
])
