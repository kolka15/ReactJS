import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { transformSync, type Options } from '@swc/core'

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url))
const libDir = here('../lib')

const shared: Options = { minify: true, sourceMaps: true, jsc: { parser: { syntax: 'typescript' }, target: 'es2023' } }

const formats = [
  { module: { type: 'es6' }, outDir: 'esm', extension: 'js' },
  { module: { type: 'commonjs' }, outDir: 'cjs', extension: 'cjs' },
] as const

for (const { module, outDir, extension } of formats) {
  const dir = here(`../dist/lib-swc/${outDir}`)

  mkdirSync(dir, { recursive: true })

  for (const file of readdirSync(libDir)) {
    const filename = join(libDir, file)
    const name = `${file.replace('.ts', '')}.${extension}`
    const { code, map } = transformSync(readFileSync(filename, 'utf8'), { ...shared, module, filename })

    writeFileSync(join(dir, `${name}.map`), map ?? '')
    writeFileSync(join(dir, name), `${code.replace(/(\.\.?\/[^'"]+)\.ts/g, `$1.${extension}`)}\n//# sourceMappingURL=${name}.map\n`)
  }
}
