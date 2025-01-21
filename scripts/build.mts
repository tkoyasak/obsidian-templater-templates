import fs from 'node:fs'
import modules from 'node:module'
import process from 'node:process'
import esbuild from 'esbuild'

const FUNCS_DIR = './functions'
const DIST_DIR = './dist'

const build = async (entry: string): Promise<void> => {
  const infile = `${FUNCS_DIR}/${entry}.ts`
  const outfile = `${DIST_DIR}/${entry}.js`

  if (!fs.existsSync(infile)) {
    console.error(`ERROR: Not found ${infile}`)
    process.exit(1)
  }

  await esbuild.build({
    bundle: true,
    platform: 'node',
    entryPoints: [infile],
    banner: {
      js: `/**
 * https://github.com/evanw/esbuild v${esbuild.version} — ${new Date().toISOString()}
 */`,
    },
    format: 'cjs',
    outfile: outfile,
    external: [...modules.builtinModules],
    target: 'es2023',
    minify: true,
    treeShaking: true,
    sourcemap: false,
    logLevel: 'info',
  })
}

const arg = process.argv[2]?.trim()

if (arg === undefined || arg === '') {
  const entries = fs
    .readdirSync(FUNCS_DIR)
    .filter((entry) => entry.endsWith('.ts'))
    .map((entry) => entry.replace(/\.ts$/, ''))
  for (const entry of entries) {
    await build(entry)
  }
} else {
  const entry = arg.replace(/\.ts$/, '')
  await build(entry)
}
