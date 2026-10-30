import { fileURLToPath } from 'node:url'
import { build, context, type BuildOptions } from 'esbuild'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// prod по умолчанию, dev включает режим сборки через --mode=dev.
const prod = !process.argv.includes('--mode=dev')

const options: BuildOptions = {
  entryPoints: [{ in: here('../app/index.tsx'), out: 'app' }],
  outdir: here('../dist/'),
  bundle: true,
  splitting: true,
  format: 'esm',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development') },
  minify: prod,
  sourcemap: prod,
  treeShaking: true, // для проверки
}

if (prod) {
  await build(options)
} else {
  const ctx = await context(options)

  await ctx.watch()

  await new Promise<void>((resolve) => {
    process.once('SIGINT', () => void ctx.dispose().then(resolve))
  })
}
