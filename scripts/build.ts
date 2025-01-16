import fs from 'node:fs'
import modules from 'node:module'
import process from 'node:process'
import esbuild from 'esbuild'

const arg = process.argv[2]
const target = arg.endsWith('.ts') ? arg : `${arg}.ts`

if (!fs.existsSync(`./srcs/${target}`)) {
  console.error(`ERROR: \`srcs/${target}\` not found`)
  process.exit(1)
}

esbuild.buildSync({
  bundle: true,
  platform: 'node',
  entryPoints: [`./srcs/${target}`],
  banner: {
    js: `/**
 * https://github.com/evanw/esbuild v${esbuild.version} — ${new Date().toISOString()}
 */`,
  },
  format: 'cjs',
  outfile: `./dist/${target.replace(/\.ts$/, '.js')}`,
  external: [...modules.builtinModules],
  target: 'es2023',
  minify: true,
  treeShaking: true,
  sourcemap: false,
  logLevel: 'info',
})
